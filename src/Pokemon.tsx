export class Pokemon {
	id: number = 0;
	name: string = "";
	sprites: {
		front_default: string;
	} = {front_default: ""};
	types: string[] = [];

	Id(id: number): Pokemon {
		this.id = id;
		return this;
	}

	Name(name: string): Pokemon {
		this.name = name;
		return this;
	}

	Sprites(sprites: {front_default: string}): Pokemon {
		this.sprites = sprites;
		return this;
	}

	Types(types: string[]): Pokemon {
		this.types = types;
		return this;
	}
}
