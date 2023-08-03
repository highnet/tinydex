export class Pokemon {
	id: number = 0;
	name: string = "";
	height: number = 0;
	weight: number = 0;
	sprites: {
		front_default: string;
	} = {front_default: ""};

	Id(id: number): Pokemon {
		this.id = id;
		return this;
	}

	Name(name: string): Pokemon {
		this.name = name;
		return this;
	}

	Height(height: number): Pokemon {
		this.height = height;
		return this;
	}

	Weight(weight: number): Pokemon {
		this.weight = weight;
		return this;
	}

	Sprites(sprites: {front_default: string}): Pokemon {
		this.sprites = sprites;
		return this;
	}
}
