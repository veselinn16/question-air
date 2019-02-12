import AnimatedText3D from './Animated3DText';

const createText = (text1) => {
    const text = new AnimatedText3D(text1, { color: '#0f070a', size: 0.8 });
    text.position.x -= text.basePosition * 0.5;

    return text;
}

export default createText;