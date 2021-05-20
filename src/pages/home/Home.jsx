import { IonContent } from '@ionic/react';
import './Home.css';
import React, {useEffect, useState} from "react";
import Phaser from 'phaser';
import {useWindowSize} from "../../components/window/WindowSize";
import { BallBouncy} from "../../components/ball-bouncy/BallBouncy";
import { BulletScene } from '../../components/bullet-scene/BulletScene';
import { Camera } from '../../components/camera/Camera';

export const Home = () => {
    const windowSize = useWindowSize();
    const [phaserGame, setPhaserGame] = useState({});
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 3000,
            pixelArt: true,
            physics: {
                default: 'arcade'
            },
            parent: 'game',
            scene: [ Camera ]
        };
        setPhaserGame(new Phaser.Game(config));
    }, [windowSize]);

    return <IonContent>
        <div id="game"/>
    </IonContent>
};
