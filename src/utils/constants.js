export const API_URL = 'http://172.21.148.167:8080/eduamp/api';

export const USER_ROLES = {
    STUDENT: 'ROLE_STUDENT',
    TEACHER: 'ROLE_TEACHER',
    ADMIN: 'ROLE_ADMIN',
};

export const YOUTUBE_LINK_PATTERN = /^https:\/\/www.youtube.com\/embed\/[^/]+\/?$/;

export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const EMPTY = 'EMPTY';

export const SPRITE_SIZE = 40;
export const MAP_HEIGHT = 15;
export const MAP_WIDTH = 29;

// export const MAP_HEIGHT = SPRITE_SIZE * 15;
// export const MAP_WIDTH = SPRITE_SIZE * 29;

export const TILE_MAPPING = {
    grass: 0,
    house: 4,
    rock: 5,
    tree: 6,
};