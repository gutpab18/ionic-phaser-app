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
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 3000,
            pixelArt: true,
            physics: {
                default: 'arcade'
            },
            parent: 'game',
            scene: [PlatformerStartScreen, Platformer, PlatformerGameOver]
        };
        const store = new Storage();
        await store.create();
        const game = new Phaser.Game(config)
        game.store = store;
        setPhaserGame(game);
    }, [windowSize]);

    return <IonContent>
        <div id="game"/>
    </IonContent>
};
