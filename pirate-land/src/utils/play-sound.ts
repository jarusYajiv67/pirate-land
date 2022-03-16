type musicId = 'bg' | 'pirate';

export const playSound = (id: musicId, loop: boolean = true) => {
    let audio: HTMLAudioElement = document.getElementById(id) as HTMLAudioElement;
    audio.currentTime = 0;
    audio.volume = 0.5;
    if (id === 'pirate') audio.volume = 0.7;
    audio.loop = loop;
    audio.play();
};

export const stopSound = (id: musicId) => {
    let audio: HTMLAudioElement = document.getElementById(id) as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
};
