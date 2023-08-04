interface IPokemon {
	id: number;
	name: string;
	sprite: string;
	types: string[];
}

export class Pokemon implements IPokemon {
	id: number = 0;
	name: string = "";
	sprite: string = "";
	types: string[] = [];

	Id(id: number): Pokemon {
		this.id = id;
		return this;
	}

	Name(name: string): Pokemon {
		this.name = name;
		return this;
	}

	Sprite(sprite: string): Pokemon {
		this.sprite = sprite;
		return this;
	}

	Types(types: string[]): Pokemon {
		this.types = types;
		return this;
	}
}
