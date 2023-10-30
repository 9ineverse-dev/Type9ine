/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { markRaw, ref } from 'vue';
import * as Misskey from 'misskey-js';
import { miLocalStorage } from './local-storage.js';
import { Storage } from '@/pizzax.js';

interface PostFormAction {
	title: string,
	handler: <T>(form: T, update: (key: unknown, value: unknown) => void) => void;
}

interface UserAction {
	title: string,
	handler: (user: Misskey.entities.UserDetailed) => void;
}

interface NoteAction {
	title: string,
	handler: (note: Misskey.entities.Note) => void;
}

interface NoteViewInterruptor {
	handler: (note: Misskey.entities.Note) => unknown;
}

interface NotePostInterruptor {
	handler: (note: FIXME) => unknown;
}

interface PageViewInterruptor {
	handler: (page: Misskey.entities.Page) => unknown;
}

export const postFormActions: PostFormAction[] = [];
export const userActions: UserAction[] = [];
export const noteActions: NoteAction[] = [];
export const noteViewInterruptors: NoteViewInterruptor[] = [];
export const notePostInterruptors: NotePostInterruptor[] = [];
export const pageViewInterruptors: PageViewInterruptor[] = [];
export const bannerDark='https://files.prismisskey.space/misskey/5182a391-5b9f-4ba9-90a5-a692aa59b938.png'
export const bannerLight ='https://files.prismisskey.space/misskey/96e65f59-eab3-47d4-bb1e-d141100bd2fc.png'
export const iconDark='https://files.prismisskey.space/misskey/f3b3c9f8-ff2a-474d-a858-64ffe9023e22.png'
export const iconLight='https://files.prismisskey.space/misskey/c7e56b1d-4c4f-408f-bf73-3175f4eb26ca.png'


// TODO: それぞれいちいちwhereとかdefaultというキーを付けなきゃいけないの冗長なのでなんとかする(ただ型定義が面倒になりそう)
//       あと、現行の定義の仕方なら「whereが何であるかに関わらずキー名の重複不可」という制約を付けられるメリットもあるからそのメリットを引き継ぐ方法も考えないといけない
export const defaultStore = markRaw(new Storage('base', {
	accountSetupWizard: {
		where: 'account',
		default: 0,
	},
	timelineTutorial: {
		where: 'account',
		default: 0,
	},
	keepCw: {
		where: 'account',
		default: true,
	},
	showFullAcct: {
		where: 'account',
		default: false,
	},
	collapseRenotes: {
		where: 'account',
		default: true,
	},
	rememberNoteVisibility: {
		where: 'account',
		default: false,
	},
	defaultNoteVisibility: {
		where: 'account',
		default: 'public',
	},
	defaultNoteLocalOnly: {
		where: 'account',
		default: false,
	},
	uploadFolder: {
		where: 'account',
		default: null as string | null,
	},
	pastedFileName: {
		where: 'account',
		default: 'yyyy-MM-dd HH-mm-ss [{{number}}]',
	},

	keepOriginalUploading: {
		where: 'account',
		default: false,
	},
	memo: {
		where: 'account',
		default: null,
	},
	reactions: {
		where: 'account',
		default: ['👍', '❤️', '😆', '🤔', '😮', '🎉', '💢', '😥', '😇', '🍮'],
	},
	reactionAcceptance: {
		where: 'account',
		default: 'nonSensitiveOnly' as 'likeOnly' | 'likeOnlyForRemote' | 'nonSensitiveOnly' | 'nonSensitiveOnlyForLocalLikeOnlyForRemote' | null,
	},
	mutedAds: {
		where: 'account',
		default: [] as string[],
	},

	menu: {
		where: 'deviceAccount',
		default: [
			'notifications',
			'clips',
			'drive',
			'followRequests',
			'-',
			'explore',
			'announcements',
			'search',
			'-',
			'ui',
			'cacheclear',
		],
	},
	visibility: {
		where: 'deviceAccount',
		default: 'public' as 'public' | 'home' | 'followers' | 'specified',
	},
	localOnly: {
		where: 'deviceAccount',
		default: false,
	},
	showPreview: {
		where: 'device',
		default: false,
	},
	statusbars: {
		where: 'deviceAccount',
		default: [] as {
			name: string;
			id: string;
			type: string;
			size: 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge';
			black: boolean;
			props: Record<string, any>;
		}[],
	},
	widgets: {
		where: 'account',
		default: [] as {
			name: string;
			id: string;
			place: string | null;
			data: Record<string, any>;
		}[],
	},
	tl: {
		where: 'deviceAccount',
		default: {
			src: 'home' as 'home' | 'local' | 'social' | 'global' | `list:${string}`,
			userList: null as Misskey.entities.UserList | null,
		},
	},
	pinnedUserLists: {
		where: 'deviceAccount',
		default: [] as Misskey.entities.UserList[],
	},

	overridedDeviceKind: {
		where: 'device',
		default: null as null | 'smartphone' | 'tablet' | 'desktop',
	},
	serverDisconnectedBehavior: {
		where: 'device',
		default: 'quiet' as 'quiet' | 'reload' | 'dialog',
	},
	nsfw: {
		where: 'device',
		default: 'respect' as 'respect' | 'force' | 'ignore',
	},
	highlightSensitiveMedia: {
		where: 'device',
		default: false,
	},
	animation: {
		where: 'device',
		default: !window.matchMedia('(prefers-reduced-motion)').matches,
	},
	animatedMfm: {
		where: 'device',
		default: false,
	},
	advancedMfm: {
		where: 'device',
		default: true,
	},
	loadRawImages: {
		where: 'device',
		default: false,
	},
	imageNewTab: {
		where: 'device',
		default: false,
	},
	enableDataSaverMode: {
		where: 'device',
		default: false,
	},
	enableUltimateDataSaverMode: {
		where: 'device',
		default: false,
	},
	enableCellularWithDataSaver: {
		where: 'device',
		default: false,
	},
    enableCellularWithUltimateDataSaver: {
        where: 'device',
        default: false,
    },
	disableShowingAnimatedImages: {
		where: 'device',
		default: window.matchMedia('(prefers-reduced-motion)').matches,
	},
	emojiStyle: {
		where: 'device',
		default: 'twemoji', // twemoji / fluentEmoji / native
	},
	disableDrawer: {
		where: 'device',
		default: false,
	},
	useBlurEffectForModal: {
		where: 'device',
		default: !/mobile|iphone|android/.test(navigator.userAgent.toLowerCase()), // 循環参照するのでdevice-kind.tsは参照できない
	},
	useBlurEffect: {
		where: 'device',
		default: !/mobile|iphone|android/.test(navigator.userAgent.toLowerCase()), // 循環参照するのでdevice-kind.tsは参照できない
	},
	showFixedPostForm: {
		where: 'device',
		default: false,
	},
	showFixedPostFormInChannel: {
		where: 'device',
		default: false,
	},
	enableInfiniteScroll: {
		where: 'device',
		default: true,
	},
	useReactionPickerForContextMenu: {
		where: 'device',
		default: false,
	},
	showGapBetweenNotesInTimeline: {
		where: 'device',
		default: false,
	},
	darkMode: {
		where: 'device',
		default: false,
	},
	gamingMode: {
		where: 'device',
		default: true,
	},
	gamingType: {
		where: 'device',
    default: 'dark',
	},
	bannerUrl:{
		where: 'device',
		default: bannerDark
	},
	iconUrl:{
		where: 'device',
		default: iconDark
	},
	instanceTicker: {
		where: 'device',
		default: 'remote' as 'none' | 'remote' | 'always',
	},
	reactionPickerSize: {
		where: 'device',
		default: 1,
	},
	reactionPickerWidth: {
		where: 'device',
		default: 1,
	},
	reactionPickerHeight: {
		where: 'device',
		default: 2,
	},
	reactionPickerUseDrawerForMobile: {
		where: 'device',
		default: true,
	},
	recentlyUsedEmojis: {
		where: 'device',
		default: [] as string[],
	},
	enablehanntenn:{
		where:'device',
		default: false
	},
	recentlyUsedUsers: {
		where: 'device',
		default: [] as string[],
	},
	defaultSideView: {
		where: 'device',
		default: false,
	},
	menuDisplay: {
		where: 'device',
		default: 'sideFull' as 'sideFull' | 'sideIcon' | 'top',
	},
	reportError: {
		where: 'device',
		default: false,
	},
	squareAvatars: {
		where: 'device',
		default: false,
	},
	showAvatarDecorations: {
		where: 'device',
		default: true,
	},
	postFormWithHashtags: {
		where: 'device',
		default: false,
	},
	postFormHashtags: {
		where: 'device',
		default: '',
	},
	themeInitial: {
		where: 'device',
		default: true,
	},
	numberOfPageCache: {
		where: 'device',
		default: 3,
	},
	specifiedColor:{
		where: 'device',
		default: '#FFFF64',
	},
	followerColor:{
		where: 'device',
		default: '#FF00FF',
	},
	homeColor:{
		where: 'device',
		default: '#00FFFF',
	},
	localOnlyColor:{
		where:'device',
		default: '#2b2c41'
	},
	numberOfGamingSpeed: {
		where: 'device',
		default: 44,
	},
	onlyAndWithSave:{
		where: 'device',
		default: false,
	},
	onlyFiles:{
		where: 'device',
		default: false,
	},
	withReplies:{
		where: 'device',
		default: true,
	},
	withRenotes:{
		where: 'device',
		default: true,
	},
	showNoteActionsOnlyHover: {
		where: 'device',
		default: false,
	},
	showClipButtonInNoteFooter: {
		where: 'device',
		default: false,
	},
	showMediaTimeline:{
		where: 'device',
		default: true,
	},
	showGlobalTimeline:{
		where: 'device',
		default: true,
	},
	showVisibilityColor:{
		where: 'device',
		default: false,
	},
	reactionsDisplaySize: {
		where: 'device',
		default: 'medium' as 'small' | 'medium' | 'large',
	},
	forceShowAds: {
		where: 'device',
		default: false,
	},
	aiChanMode: {
		where: 'device',
		default: false,
	},
	devMode: {
		where: 'device',
		default: false,
	},
	mediaListWithOneImageAppearance: {
		where: 'device',
		default: 'expand' as 'expand' | '16_9' | '1_1' | '2_3',
	},
	notificationPosition: {
		where: 'device',
		default: 'rightBottom' as 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom',
	},
	notificationStackAxis: {
		where: 'device',
		default: 'horizontal' as 'vertical' | 'horizontal',
	},
	enableCondensedLineForAcct: {
		where: 'device',
		default: false,
	},
	additionalUnicodeEmojiIndexes: {
		where: 'device',
		default: {} as Record<string, Record<string, string[]>>,
	},
	keepScreenOn: {
		where: 'device',
		default: false,
	},
	FeaturedOrNote: {
		where: 'device',
		default: false
	},
	tlWithReplies: {
		where: 'device',
		default: false,
	},
	defaultWithReplies: {
		where: 'account',
		default: false,
	},
	hideMutedNotes: {
		where: 'device',
		default: false,
	},
	disableStreamingTimeline: {
		where: 'device',
		default: false,
	},
}));


// TODO: 他のタブと永続化されたstateを同期

const PREFIX = 'miux:' as const;

export type Plugin = {
	id: string;
	name: string;
	active: boolean;
	config?: Record<string, { default: any }>;
	configData: Record<string, any>;
	token: string;
	src: string | null;
	version: string;
	ast: any[];
	author?: string;
	description?: string;
	permissions?: string[];
};

interface Watcher {
	key: string;
	callback: (value: unknown) => void;
}

/**
 * 常にメモリにロードしておく必要がないような設定情報を保管するストレージ(非リアクティブ)
 */
import lightTheme from '@/themes/l-light.json5';
import darkTheme from '@/themes/d-green-lime.json5';

export class ColdDeviceStorage {
	public static default = {
		lightTheme,
		darkTheme,
		syncDeviceDarkMode: true,
		plugins: [] as Plugin[],
	};

	public static watchers: Watcher[] = [];

	public static get<T extends keyof typeof ColdDeviceStorage.default>(key: T): typeof ColdDeviceStorage.default[T] {
		// TODO: indexedDBにする
		//       ただしその際はnullチェックではなくキー存在チェックにしないとダメ
		//       (indexedDBはnullを保存できるため、ユーザーが意図してnullを格納した可能性がある)
		const value = miLocalStorage.getItem(`${PREFIX}${key}`);
		if (value == null) {
			return ColdDeviceStorage.default[key];
		} else {
			return JSON.parse(value);
		}
	}

	public static getAll(): Partial<typeof this.default> {
		return (Object.keys(this.default) as (keyof typeof this.default)[]).reduce((acc, key) => {
			const value = localStorage.getItem(PREFIX + key);
			if (value != null) {
				acc[key] = JSON.parse(value);
			}
			return acc;
		}, {} as any);
	}

	public static set<T extends keyof typeof ColdDeviceStorage.default>(key: T, value: typeof ColdDeviceStorage.default[T]): void {
		// 呼び出し側のバグ等で undefined が来ることがある
		// undefined を文字列として miLocalStorage に入れると参照する際の JSON.parse でコケて不具合の元になるため無視
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (value === undefined) {
			console.error(`attempt to store undefined value for key '${key}'`);
			return;
		}

		miLocalStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));

		for (const watcher of this.watchers) {
			if (watcher.key === key) watcher.callback(value);
		}
	}

	public static watch(key, callback) {
		this.watchers.push({ key, callback });
	}

	// TODO: VueのcustomRef使うと良い感じになるかも
	public static ref<T extends keyof typeof ColdDeviceStorage.default>(key: T) {
		const v = ColdDeviceStorage.get(key);
		const r = ref(v);
		// TODO: このままではwatcherがリークするので開放する方法を考える
		this.watch(key, v => {
			r.value = v;
		});
		return r;
	}

	/**
	 * 特定のキーの、簡易的なgetter/setterを作ります
	 * 主にvue場で設定コントロールのmodelとして使う用
	 */
	public static makeGetterSetter<K extends keyof typeof ColdDeviceStorage.default>(key: K) {
		// TODO: VueのcustomRef使うと良い感じになるかも
		const valueRef = ColdDeviceStorage.ref(key);
		return {
			get: () => {
				return valueRef.value;
			},
			set: (value: unknown) => {
				const val = value;
				ColdDeviceStorage.set(key, val);
			},
		};
	}
}
