// constants
const ROWS: number = 10;
const COLUMNS: number = 10;
const SIZE: number = ROWS * COLUMNS;
const BIAS_SIZE: number = 20;
const CHAR_SET_SIZE: number = 26;


/**
 *  implements domain logic
 */
export class Domain {

    // grid and code
    private _grid: Array<string> = [];
    private _code: string = "";
    
    // user provided character bias(value and state)
    private _bias: string = "";

    // states
    private _canSetBias: boolean = true;
    private _isLive: boolean = false;

    constructor() {
        // initialize the grid with empty cells
        this._grid = new Array<string>(SIZE).fill("");
    }

    /**
     * Starts the generator
     * @returns 
     */
    public generate(): number {
        // only permit starting once
        if(this._isLive) return 401;

        // initialize the grid for the first time
        this._isLive = true;
        this.generateGrid();

        // update the grid automatically in two seconds interval 
        setInterval(this.generateGrid.bind(this), 2000);
        return 200;
    }

    /**
     * Set character bias, the character will be inserted at least in 20% of the cells
     * @param bias value in domain['a'..'z']
     * @returns HTTP code
     */
    public setBias(bias: string): number {
        console.log("setBias: " + bias);

        if(!this._canSetBias) {
            return 409; // conflict
        }

        // validate input
        if(bias < 'a' || bias > 'z') {
            return 400; // bad request
        }

        // update bias
        this._bias = bias;
        
        let handle = setTimeout((): void => {
            // just for validation
            // console.log(new Date(Date.now()).toString() + ", setting character bias: " + bias);
            // update state
            this._canSetBias = true;
            // remove the handle
            clearTimeout(handle);
        }, 4000);

        this._canSetBias = false;
        return 200;
    }

    /**
     * Returns the calculated grid
     * @returns 
     */
    public getGrid(): Array<string> {
        return this._grid;
    }

    /**
     * 
     * @returns 
     */
    public getCode(): string {
        return this._code;
    }

    /**
     * predicate to assert if the grid is generating automatically
     * @returns true if the generator is live false otherwise
     */
    public isLive(): boolean {
        return this._isLive;
    }

    /**
     * generates random the 10x10 grid
     * @returns nothing
     */
    private generateGrid(): void {
        let grid: Array<string> = new Array<string>(100);
        for (let i = 0; i < SIZE; i++) {
            grid[i] = String.fromCharCode(97 + Math.random() * CHAR_SET_SIZE | 0)
        }

        // apply required cell constants
        grid[this.toLinearAddress(0, 1)] = 'b';
        grid[this.toLinearAddress(8, 7)] = 'k';

        // apply bias if any
        if (this._bias !== "") {
            for (let i = 0; i < BIAS_SIZE; i++) {
                while (true) {
                    let cell = Math.random() * SIZE | 0;
                    if (grid[cell] == this._bias)
                        continue;
                    grid[cell] = this._bias;
                    break;
                }
            }
        }

        this._grid = grid; // finally update grid property
        this.generateCode();
    }

    /**
     * Code/secret
     * @returns a two digit string 
     */
    private generateCode(): void {
        // must be live to be able to produce a code
        if(this._isLive === false) {
            return;
        }

        // 1. Get 2 digit seconds from host clock
        const coordinate = ("" + new Date(Date.now()).getSeconds()).padStart(2, "0");
        const x = parseInt(coordinate[0]),
              y = parseInt(coordinate[1]);

        //  2. Get the matching grid cell characters for the given positions.
        const v0 = this._grid[this.toLinearAddress(x, y)],
              v1 = this._grid[this.toLinearAddress(y, x)];

        // 3. Count the occurrences of v0 and v1 on the entire grid.
        let acc0 = 0, acc1 = 0;
        for (let i = 0; i < SIZE; i++) {
            let ch = this._grid[i];
            if (ch === v0) acc0++;
            if (ch === v1) acc1++;
        }

        // 4. Exception: If the count is larger than 9, divide the count by the lowest integer possible
        // in order to get a value lower or equal to 9.        
        acc0 = this.clampValue(acc0);
        acc1 = this.clampValue(acc1);

        this._code = ("" + (acc1 * 10 + acc0)).padStart(2, "0");
    }

    /**
     * 
     * @param value 
     * @returns 
     */
    private clampValue(value: number): number {
        // apply rule? 
        if(value > 9) {
            for(let min_denominator = 2; min_denominator < 10; min_denominator++) {
                let res = value % min_denominator;
                if(res < 10) {
                    return res;
                }
            }
        }

        return value; // the value already in range [0..9]
    }

    /**
     * convert from 2D to 1D using the following formula: cell = y * columns + x
     * @param x 
     * @param y 
     * @returns 
     */
    private toLinearAddress(x: number, y: number): number {
        return y * 10 + x;
    }
}
