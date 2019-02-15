import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners


addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
function Star(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = "#" + ((1 << 24) * Math.random() | 0).toString(16) //color
    this.gravity = 1
    this.friction = 0.8
    this.vel = {
        x: utils.randomIntFromRange(-4, 4),
        y: 3
    }
}

Star.prototype.draw = function () {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor = "#E3EAEF"
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

Star.prototype.update = function () {
    this.draw()
    //when ball hits bottom of screen
    if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
        this.vel.y = -this.vel.y * this.friction
        this.shatter()

    } else {
        this.vel.y += this.gravity
    }

    //if hits side of screen
    if (this.x + this.radius + this.vel.x > canvas.width || this.x - this.radius <= 0) {
        this.vel.x = -this.vel.x
        this.shatter()
    }
    this.x += this.vel.x
    this.y += this.vel.y
}

Star.prototype.shatter = function () {
    this.radius -= 1
    for (let i = 0; i < 4; i++) {
        miniStars.push(new miniStar(this.x, this.y, 2))
    }
}

function miniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color)
    this.vel = {
        x: utils.randomIntFromRange(-5, 5),
        y: utils.randomIntFromRange(-15, 15)
    }
    this.friction = 0.8
    this.gravity = 0.4
    this.ttl = 100  //Time to Life
    this.opacity = 1
    this.r = utils.randomIntFromRange(0, 300)
    this.g = utils.randomIntFromRange(0, 300)
    this.b = utils.randomIntFromRange(0, 300)

}
miniStar.prototype.draw = function () {

    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`
    c.shadowColor = "#E3EAEF"
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
}

miniStar.prototype.update = function () {
    this.draw()
    //when ball hits bottom of screen
    if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
        this.vel.y = -this.vel.y * this.friction
    } else {
        this.vel.y += this.gravity
    }
    this.x += this.vel.x
    this.y += this.vel.y
    this.ttl -= 1
    this.opacity -= 1 / this.ttl

}

function createMountainRange(mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount
        c.beginPath()
        c.moveTo(i * mountainWidth, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
        c.lineTo(i * mountainWidth - 325, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()

    }
}

// Implementation
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height) //top to bottom
backgroundGradient.addColorStop(0, "#171e26")
backgroundGradient.addColorStop(1, "#3f586b")
let stars
let miniStars
let bgStars
let ticker = 0
let randomSpawnRate = 135
const groundHeight = 70
function init() {
    stars = []
    miniStars = []
    bgStars = []
    for (let i = 0; i < 1; i++) {
        stars.push(new Star(canvas.width / 2, 30, 15, "#E3EAEF"))
    }
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 3
        bgStars.push(new Star(x, y, radius, "white"))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)





    bgStars.forEach((bgStars => {
        bgStars.draw()
    }))

    createMountainRange(1, canvas.height - 50, "#384551")
    createMountainRange(2, canvas.height - 100, "#2B3843")
    createMountainRange(3, canvas.height - 300, "#26333E")
    c.fillStyle = "#182028"
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)

    stars.forEach((star, index) => {
        star.update();
        if (star.radius == 0) {
            stars.splice(index, 1)
        }
    });
    miniStars.forEach((miniStar, index) => {
        miniStar.update();
        if (miniStar.ttl == 0) {
            miniStars.splice(index, 1)
        }
    })

    ticker++

    if (ticker % randomSpawnRate == 0) {
        const radius = 15
        const x = Math.max(radius, Math.random() * canvas.width - radius)

        stars.push(new Star(x, -100, radius, "white"))
        randomSpawnRate = utils.randomIntFromRange(75, 100)
    }
}

init()
animate()
