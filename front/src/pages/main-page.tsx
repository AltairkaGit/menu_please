import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import clsx from "clsx"

export const MainPage = () => {
    return (
        <motion.main className="">
            <motion.section className={clsx("relative bg-[url('/src/static/bg.jpg')] h-dvh",
                "flex flex-col items-center gap-16 justify-center overflow-hidden")}>
                <motion.img layout variants={{in: {left: '70%', top: '55%'}, out: {left: '100%', top: '100%'}}} transition={{duration: 0.6}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none max-w-[inherit]" src="/src/static/soup.png" />
                <motion.img layout variants={{in: {right: '50%',  bottom: '54%'}, out: {right: '100%',  bottom: '100%'}}} transition={{duration: 0.6}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none max-w-[inherit]" src="/src/static/tray.png" />
                <motion.img layout variants={{in: {left: '77%', bottom: '54%'}, out: {left: '100%', bottom: '100%'}}} transition={{duration: 0.64}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none max-w-[inherit]" src="/src/static/salad.png" />
                <motion.img layout variants={{in: {right: '70%', top: '70%'}, out: {right: '100%', top: '100%'}}} transition={{duration: 0.36}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none max-w-[inherit]" src="/src/static/leafs_bot.png" />
                <motion.img layout variants={{in: {left: '45%', bottom: '80%'}, out: {left: '100%', bottom: '100%'}}} transition={{duration: 0.25}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none max-w-[inherit]" src="/src/static/leafs_top.png" />
                <motion.h1 className="title" layout initial="out" animate="in" exit="out" variants={{in: {y: 0, opacity: 1}, out: {y: '20%', opacity: 0}}}>
                    Menu, please
                </motion.h1>
                <Outlet />
            </motion.section>
            <motion.section>
                Dashboard presentation
            </motion.section>
            <motion.section>
                Studio presentation
            </motion.section>
            <motion.section>
                Более 200 идей и рецептов &
                Dishes list
            </motion.section>
        </motion.main>
    )
}