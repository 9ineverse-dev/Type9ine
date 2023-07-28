import { Injectable } from '@nestjs/common';
import { checkWordMute } from '@/misc/check-word-mute.js';
import { isInstanceMuted } from '@/misc/is-instance-muted.js';
import { isUserRelated } from '@/misc/is-user-related.js';
import type { Packed } from '@/misc/json-schema.js';
import { MetaService } from '@/core/MetaService.js';
import { NoteEntityService } from '@/core/entities/NoteEntityService.js';
import { bindThis } from '@/decorators.js';
import { RoleService } from '@/core/RoleService.js';
import Channel from '../channel.js';

class GlobalTimelineChannel extends Channel {
	public readonly chName = 'globalTimeline';
	public static shouldShare = true;
	public static requireCredential = false;
	private withReplies: boolean;

	constructor(
		private metaService: MetaService,
		private roleService: RoleService,
		private noteEntityService: NoteEntityService,

		id: string,
		connection: Channel['connection'],
	) {
		super(id, connection);
		//this.onNote = this.onNote.bind(this);
	}

	@bindThis
	public async init(params: any) {
		const policies = await this.roleService.getUserPolicies(this.user ? this.user.id : null);
		if (!policies.gtlAvailable) return;

		this.withReplies = params.withReplies as boolean;

		// Subscribe events
		this.subscriber.on('notesStream', this.onNote);
	}

	@bindThis
	private async onNote(note: Packed<'Note'>) {
    if(note.id != null) return;//スポットライトの自動更新は一時的に削除


		let DynamicRenoteCount1 = 3;
		let DynamicRenoteCount2 = 10;
		let DynamicRenoteCount3 = 15;
		let DynamicRenoteCount4 = 30;
		let DynamicRenoteCount5 = 50;

		if (!(
			(note.channelId == null && note.renote!.renoteCount == DynamicRenoteCount2 && note.user.host == null && note.renoteId != null)||
			(note.channelId == null && this.following.has(note.renote!.userId) && note.renote!.renoteCount == DynamicRenoteCount1 && note.renoteId != null)||
			(note.channelId == null && note.renote!.renoteCount == DynamicRenoteCount2 && note.user.host == null && note.renoteId != null))
		) return;

		let gnote = await this.noteEntityService.pack(note.renoteId, this.user!, {
			detail: true,
		});

		if (['followers', 'specified'].includes(note.visibility)) {
			gnote = await this.noteEntityService.pack(note.renoteId, this.user!, {
				detail: true,
			});

			if (note.isHidden) {
				return;
			}
		} else {
			// リプライなら再pack
			if (gnote.replyId != null) {
				gnote.reply = await this.noteEntityService.pack(gnote.replyId, this.user!, {
					detail: true,
				});
			}
			// Renoteなら再pack
			if (gnote.renoteId != null) {
				gnote.renote = await this.noteEntityService.pack(gnote.renoteId, this.user!, {
					detail: true,
				});
			}
		}

		// Ignore notes from instances the user has muted
		if (isInstanceMuted(gnote, new Set<string>(this.userProfile!.mutedInstances ?? []))) return;

		// 関係ない返信は除外
		if (gnote.reply && !this.withReplies) {
			const reply = gnote.reply;
			// 「チャンネル接続主への返信」でもなければ、「チャンネル接続主が行った返信」でもなければ、「投稿者の投稿者自身への返信」でもない場合
			if (reply.userId !== this.user!.id && note.userId !== this.user!.id && reply.userId !== note.userId) return;
		}

		// 流れてきたNoteがミュートしているユーザーが関わるものだったら無視する
		if (isUserRelated(gnote, this.userIdsWhoMeMuting)) return;
		// 流れてきたNoteがブロックされているユーザーが関わるものだったら無視する
		if (isUserRelated(gnote, this.userIdsWhoBlockingMe)) return;

		if (gnote.renote && !gnote.text && isUserRelated(gnote, this.userIdsWhoMeMutingRenotes)) return;

		// 流れてきたNoteがミュートすべきNoteだったら無視する
		// TODO: 将来的には、単にMutedNoteテーブルにレコードがあるかどうかで判定したい(以下の理由により難しそうではある)
		// 現状では、ワードミュートにおけるMutedNoteレコードの追加処理はストリーミングに流す処理と並列で行われるため、
		// レコードが追加されるNoteでも追加されるより先にここのストリーミングの処理に到達することが起こる。
		// そのためレコードが存在するかのチェックでは不十分なので、改めてcheckWordMuteを呼んでいる
		if (this.userProfile && await checkWordMute(gnote, this.user, this.userProfile.mutedWords)) return;

		this.connection.cacheNote(gnote);

		this.send('note', gnote);
	}

	@bindThis
	public dispose() {
		// Unsubscribe events
		this.subscriber.off('notesStream', this.onNote);
	}
}

@Injectable()
export class GlobalTimelineChannelService {
	public readonly shouldShare = GlobalTimelineChannel.shouldShare;
	public readonly requireCredential = GlobalTimelineChannel.requireCredential;

	constructor(
		private metaService: MetaService,
		private roleService: RoleService,
		private noteEntityService: NoteEntityService,
	) {
	}

	@bindThis
	public create(id: string, connection: Channel['connection']): GlobalTimelineChannel {
		return new GlobalTimelineChannel(
			this.metaService,
			this.roleService,
			this.noteEntityService,
			id,
			connection,
		);
	}
}
