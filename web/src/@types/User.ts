export type UserDiscord = {
    id: number;
    username: string;
    avatar: string | null;
    discriminator: string;
}

export interface AdFormData {
    game?: string;
    name?: string;
    yearsPlaying?: number;
    discord?: string;
    weekDays?: number;
    hourStart?: string;
    hourEnd?: string;
    useVoiceChannel?: boolean;
}