import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import clsx from "clsx"

export const MainPage = () => {
    return (
        <motion.main className="">
            <motion.section className={clsx("relative bg-[url('/src/static/bg.jpg')] h-dvh",
                "bg-cover bg-center flex flex-col items-center gap-16 justify-center overflow-hidden")}>
                <motion.img layout variants={{in: {right: '-220px', bottom: '-300px'},  out: {right: '-880px', bottom: '-1200px'}}} transition={{duration: 0.65}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/soup.png" />
                <motion.img layout variants={{in: {left: '-220px',  top: '-240px'},     out: {left: '-1200px',  top: '-800px'}}} transition={{duration: 0.75}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/tray.png" />
                <motion.img layout variants={{in: {right: '-170px', top: '-170px'},     out: {right: '-800px', top: '-800px'}}} transition={{duration: 1}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/salad.png" />
                <motion.img layout variants={{in: {left: '20px', bottom: '0px'},        out: {left: '-880px', bottom: '-1200px'}}} transition={{duration: 0.36}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/leafs_bot.png" />
                <motion.img layout variants={{in: {right: '400px', top: '-180px'},      out: {right: '400px', top: '-800px'}}} transition={{duration: 0.25}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/leafs_top.png" />
                <motion.img layout variants={{in: {left: '300px', bottom: '340px'},     out: {left: '-800px', bottom: '-340px'}}} transition={{duration: 0.24}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/paper1.png" />
                <motion.img layout variants={{in: {right: '220px', bottom: '400px'},    out: {right: '-800px', bottom: '400px'}}} transition={{duration: 0.42}} initial="out" animate="in" exit="out" className="absolute z-10 pointer-events-none" src="/src/static/paper2.png" /> 
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