import { type Game } from "./game";
import { type ObjectKind, type SurvivBitStream, TypeToId, type Orientation } from "../utils";
import { type Body, type Vec2 } from "planck";

export abstract class GameObject {
    // For interop with subclasses
    isPlayer?: boolean;
    isObstacle?: boolean;
    isBullet?: boolean;
    isLoot?: boolean;
    isProjectile?: boolean;

    abstract kind: ObjectKind;

    id: number;

    typeString: string;
    typeId: number;

    _position: Vec2;
    layer: number;
    // why is this field optional?
    orientation?: Orientation;
    scale = 1;

    dead = false;
    showOnMap = false;

    interactable = false;
    interactionRad = 0;
    damageable = false;

    game: Game;

    body: Body | null;

    protected constructor (game: Game,
        typeString: string,
        position: Vec2,
        layer: number,
        orientation?: Orientation) {
        this.id = game.nextObjectId;
        this.typeString = typeString;
        if (this.typeString) this.typeId = TypeToId[typeString];
        this._position = position;
        this.layer = layer;
        this.orientation = orientation;
        this.game = game;
    }

    get position (): Vec2 {
        return this._position;
    }

    abstract serializePartial (stream: SurvivBitStream): void;
    abstract serializeFull (stream: SurvivBitStream): void;

    abstract damage (amount: number, source): void;
}
