import { Avatar, Tooltip } from '@chakra-ui/react';

export default function PlayerAvatar({ player, size }) {
	return (
		<Tooltip hasArrow label={player?.name}>
			<Avatar size={size} name={player?.name} />
		</Tooltip>
	);
}
