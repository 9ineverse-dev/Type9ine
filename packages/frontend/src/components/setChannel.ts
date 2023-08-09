import * as os from '@/os';

export async function setChannel(viaKeyboard = false): Promise<void> {
const channels = await os.api('channels/my-favorites', {
limit: 20,
});
const items = channels.map(channel => ({
text: channel.name,
icon: 'ti ti-repeat',
action: () => {
os.post({
renote: appearNote,
channel: channel,
});
},
}));
os.popupMenu(items, renoteButton.value, {
viaKeyboard,
});
}
