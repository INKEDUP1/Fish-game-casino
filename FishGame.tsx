
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const FishGame: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      parent: gameRef.current || undefined,
    };

    const game = new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.image('bg', '/fishgame/bg.png');
      this.load.image('fish', '/fishgame/fish.png');
      this.load.image('bullet', '/fishgame/bullet.png');
    }

    function create(this: Phaser.Scene) {
      this.add.image(400, 300, 'bg');

      const fish = this.physics.add.image(100, 100, 'fish');
      fish.setVelocity(100, 40);
      fish.setCollideWorldBounds(true);
      fish.setBounce(1);

      this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        const bullet = this.physics.add.image(400, 560, 'bullet');
        this.physics.moveTo(bullet, pointer.x, pointer.y, 400);
        this.physics.add.overlap(bullet, fish, () => {
          bullet.destroy();
          fish.destroy();
          console.log('Hit fish!');
        });
      });
    }

    function update(this: Phaser.Scene) {}

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef} className="w-full h-full" />;
};

export default FishGame;
