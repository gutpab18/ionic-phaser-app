import { IonContent } from '@ionic/react';
import './Home.css';
import React, {useEffect, useState} from "react";
import Phaser from 'phaser';
import {useWindowSize} from "../../components/window/WindowSize";
import { BallBouncy} from "../../components/ball-bouncy/BallBouncy";
import { BulletScene } from '../../components/bullet-scene/BulletScene';
import { Camera } from '../../components/camera/Camera';
import { Platformer } from '../../components/Platformer/Platformer';
import { PlatformerGameOver } from '../../components/Platformer/PlatformerGameOver';
import { PlatformerStartScreen } from '../../components/Platformer/PlatformerStartScreen';
import { Storage } from '@ionic/storage';

 
export const Home = () => {
    const windowSize = useWindowSize();
    const [phaserGame, setPhaserGame] = useState({});
    useEffect(async () => {
        const store = new Storage();
        await store.create();
        const config = {
            type: Phaser.AUTO,
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio,
            pixelArt: true,
            physics: {
                default: 'arcade'
            },
            parent: 'game',
            scene: [PlatformerStartScreen, Platformer, PlatformerGameOver]
        };
        const game = new Phaser.Game(config);
        game.config.store = store;
        setPhaserGame(game);
    }, [windowSize]);

    return <IonContent>
        <div id="game"/>
    </IonContent>
};
