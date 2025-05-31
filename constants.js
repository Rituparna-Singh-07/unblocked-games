export const BIRD_SIZE = { width: 50, height: 40 }; // Adjusted for emoji size
export const GRAVITY = 0.5;
export const JUMP_STRENGTH = -9;
export const PIPE_WIDTH = 80;
export const PIPE_GAP = 170; // Increased gap slightly for playability
export const PIPE_SPEED = 3;
export const GAME_WIDTH = 420; // Common mobile width, slightly increased
export const GAME_HEIGHT = 550;
export const GROUND_HEIGHT = 80;
export const CEILING_HEIGHT = 0; // No explicit ceiling collision, bird capped at y=0
export const PIPE_SPAWN_FRAME_COUNT = 100; // Spawn pipe every ~1.6 seconds at 60fps
export const BIRD_INITIAL_X_POSITION = GAME_WIDTH / 4;
export const BIRD_INITIAL_Y_POSITION = GAME_HEIGHT / 2 - BIRD_SIZE.height / 2;

export const BIRD_FLAP_ROTATION = -20;
export const BIRD_MAX_DOWN_ROTATION = 70;
export const BIRD_ROTATION_SPEED = 5;

// Parallax Background Scroll Speeds and Pattern Info
export const GROUND_SCROLL_SPEED_MULTIPLIER = 1.0; // Scrolls with pipes
export const CITY_SCROLL_SPEED_MULTIPLIER = 0.3;   // Slower for parallax
export const CLOUD_SCROLL_SPEED_MULTIPLIER = 0.1; // Slowest for distant clouds

// These are example pattern widths, adjust if using actual images with specific repeating widths
export const GROUND_PATTERN_WIDTH = 48; // Width of the repeating ground pattern unit
export const CITY_PATTERN_WIDTH = GAME_WIDTH; // Cityscape can be simpler, repeating over game width
export const CLOUD_PATTERN_WIDTH = GAME_WIDTH * 2; // Clouds can be a wider repeating pattern