"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function HeroAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions to full screen
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        setCanvasDimensions()
        window.addEventListener("resize", setCanvasDimensions)

        // Create particles
        const particles: Particle[] = []
        const particleCount = 50

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor() {
                this.x = Math.random() * (canvas?.width ?? 0)
                this.y = Math.random() * (canvas?.height ?? 0)
                this.size = Math.random() * 5 + 1
                this.speedX = (Math.random() - 0.5) * 2
                this.speedY = (Math.random() - 0.5) * 2
                this.color = `rgba(${40 + Math.random() * 30}, ${200 + Math.random() * 55}, ${40 + Math.random() * 30}, ${0.3 + Math.random() * 0.4})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > (canvas?.width ?? 0)) this.x = 0
                else if (this.x < 0) this.x = (canvas?.width ?? 0)

                if (this.y > (canvas?.height ?? 0)) this.y = 0
                else if (this.y < 0) this.y = (canvas?.height ?? 0)
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw particles
            particles.forEach((particle) => {
                particle.update()
                particle.draw()
            })

            // Draw connections between particles
            ctx.strokeStyle = "rgba(40, 230, 40, 0.1)"
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.lineWidth = 1 - distance / 100
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", setCanvasDimensions)
        }
    }, [])

    return (
        <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
    )
}
