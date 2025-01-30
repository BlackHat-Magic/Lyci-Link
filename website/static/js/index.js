document.addEventListener ("alpine:init", () => {
    Alpine.data ("main", () => ({
        cursor_x: 0,
        cursor_y: 0,

        screen_width: 0,
        screen_height: 0,

        current_x: 0,
        current_y: 0,

        current_x_adjusted: 0,
        current_y_adjusted: 0,

        v_x: 0,
        v_y: 0,

        init () {
            this.screen_width = window.innerWidth;
            this.screen_height = window.innerHeight;

            if (this.screen_width < 900) {
                window.addEventListener("deviceorientation", (event) => {
                    beta = event.beta;
                    gamma = event.gamma;

                    if(beta < -45) {
                        beta = -45;
                    } else if (beta > 45) {
                        beta = 45;
                    }
                    if(gamma < -45) {
                        gamma = -45;
                    } else if (gamma > 45) {
                        gamma = 45
                    }

                    this.cursor_x = gamma / 45 * this.screen_width;
                    this.cursor_y = beta / 45 * this.screen_height;
                })
            } else {
                window.addEventListener("mousemove", (event) => {
                    this.cursor_x = event.clientX;
                    this.cursor_y = event.clientY;
                });
            }

            window.addEventListener("resize", () => {
                this.screen_width = window.innerWidth;
                this.screen_height = window.innerHeight;
            })

            this.update_background ()
        },

        update_background () {
            // this function is cursed don't look at it
            middle_x = this.screen_width / 2;
            middle_y = this.screen_height / 2;

            cursor_relative_x = this.cursor_x - middle_x;
            cursor_relative_y = this.cursor_y - middle_y;

            cursor_prop_rel_x = cursor_relative_x / middle_x;
            cursor_prop_rel_y = cursor_relative_y / middle_y;

            this.target_x = cursor_prop_rel_x * -1 * 25;
            this.target_y = cursor_prop_rel_y * -1 * 25;

            this.v_x += (this.target_x - this.current_x)  * 0.001;
            this.v_y += (this.target_y - this.current_y)  * 0.001;

            this.v_x *= 0.95;
            this.v_y *= 0.95;

            this.current_x += this.v_x;
            this.current_y += this.v_y;
            // of course coordinates are relative to the element itself and not the document
            // why would it be any way else?
            // simplicity? to make it intuitive? nonsense!!
            v_x_adj = Math.sqrt(2) / 2 * this.v_x + -1 * Math.sqrt(2) / 2 * this.v_y;
            v_y_adj = Math.sqrt(2) / 2 * this.v_y + Math.sqrt(2) * 2 / 2 * this.v_x;
            this.current_x_adjusted += v_x_adj;
            this.current_y_adjusted += v_y_adj;
            
            background_container = document.querySelector("#background");
            for (let i = 0; i < background_container.children.length; i++) {
                background_container.children[i].style.transform = `translate(${this.current_x_adjusted}px, ${this.current_y_adjusted}px)`;
            }
            if(this.screen_width > 900) {
                content = document.querySelector("#content");
                content.style.transform = `translate(${this.current_x / 4}px, ${this.current_y / 4}px)`;
            }

            requestAnimationFrame(() => this.update_background ());
        },

        line_number () {
            text_height = Math.sqrt(2) * document.querySelector("#reference").getBoundingClientRect().height;
            min_repeats_x = Math.ceil(this.screen_width / text_height);
            min_repeats_y = Math.ceil(this.screen_height / text_height);
            return(min_repeats_x + min_repeats_y + 1);
        },

        repeat_number () {
            text_width = Math.sqrt(2) / 2 * document.querySelector("#reference").getBoundingClientRect().width;
            console.log(text_width)
            smallest = Math.max(this.screen_width, this.screen_height);
            return(Math.ceil(smallest / text_width) + 1);
        },

        calculate_top (i) {
            top = 121 * (i - 1);
            return(top)
        }
    }))
})