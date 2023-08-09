import * as os from '@/os';
import { props, visibilityButton } from './MkPostForm.vue';

export async function setChannel(viaKeyboard = false): Promise<void> {
const channels = await os.api('channels/my-favorites', {
limit: 9,
});
let items = channels.map(channel => ({
text: channel.name,
icon: 'ti ti-repeat',
action: () => {
props.channel = channel;
},
}));

items = items + {
text: channel.name,
icon: 'ti ti-repeat',
action: () => {
props.channel = null;
},
};
os.popupMenu(items, visibilityButton.value, {
viaKeyboard,
});
}
