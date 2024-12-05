
export interface User {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string | null;
    pm_friends_only: boolean;
    profile_colour: string | null;
    username: string;
    cover_url: string | null;
    discord: string | null;
    has_supported: boolean;
    interests: string | null;
    join_date: string;
    kudosu: {
        total: number;
        available: number;
    };
    location: string | null;
    max_blocks: number;
    max_friends: number;
    occupation: string | null;
    playmode: string;
    playstyle: string[];
    post_count: number;
    profile_hue: number | null;
    profile_order: string[];
    title: string | null;
    twitter: string | null;
    website: string | null;
    country: {
        code: string;
        name: string;
    };
    cover: {
        custom_url: string | null;
        url: string | null;
        id: number | null;
    };
    is_restricted: boolean;
    account_history: any[]; // Replace `any` with a specific type if details are available
    active_tournament_banner: string | null;
    badges: {
        awarded_at: string;
        description: string;
        image_at2x_url: string;
        image_url: string;
        url: string;
    }[];
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: {
        id: number;
        identifier: string;
        name: string;
        short_name: string;
        description: string;
        colour: string;
    }[];
    loved_beatmapset_count: number;
    monthly_playcounts: {
        start_date: string;
        count: number;
    }[];
    page: {
        html: string;
        raw: string;
    };
    pending_beatmapset_count: number;
    previous_usernames: string[];
    ranked_beatmapset_count: number;
    replays_watched_counts: {
        start_date: string;
        count: number;
    }[];
    scores_first_count: number;
    statistics: {
        level: {
            current: number;
            progress: number;
        };
        pp: number;
        global_rank: number | null;
        ranked_score: number;
        hit_accuracy: number;
        play_count: number;
        play_time: number;
        total_score: number;
        total_hits: number;
        maximum_combo: number;
        replays_watched_by_others: number;
        is_ranked: boolean;
        grade_counts: {
            ss: number;
            ssh: number;
            s: number;
            sh: number;
            a: number;
        };
        rank: {
            global: number | null;
            country: number | null;
        };
    };
    support_level: number;
    user_achievements: {
        achieved_at: string;
        achievement_id: number;
    }[];
    rank_history: {
        mode: string;
        data: number[];
    };
}
