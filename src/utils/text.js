import AnimatedText3D from './Animated3DText';

export const createText = (text) => {
    const animatedText = new AnimatedText3D(text, { color: '#0f070a', size: 0.8 });
    animatedText.position.x -= animatedText.basePosition * 0.5;

    return animatedText;
}