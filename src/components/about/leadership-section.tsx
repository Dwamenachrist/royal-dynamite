"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const teamConfig = [
    {
        name: "Kwame Mensah",
        role: "CEO & Founder",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqjkiYVTR2Rh7zlynvaVZNTimR1JlxlYvkw_btkCQzwHRqcO1ucPtNLyXw_5CZkjm9uWnqGxT00JrBdQyLiU-uPmRWuK0kItavAhyn4Rp5AMoZQ-zhyjdL-QqsMJ5-AySgV__AhGebc66i0_8lmfOB5j4irkI9VDGeZ-55zyxWtjVarSdwDCm9duqoa7zCTR-ARcb_D0K0YzBzabYuMDThw7uu6fDA7c8m-57U4gyZwmZbe4nWC1E701u_cdBBbHh523PAmJYHnyO"
    },
    {
        name: "Ama Osei",
        role: "Head of Sales",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfiw33vXMVEcfuqPgimxCGqTUISV_QcfVBsSodoDQ85u4Bq5EgyZNTpge9OQbvYPN8jimmC3aQAmTIGtuQEzAqEswHvXhYQ-CQ4z8zYJ5M-fBG1w9QoG5yHMn2BTTFTdOPxpiz79wKHr7djJb6c7aDzXcGaODZRjWPJn4eJ4koDi34L3GoB5ahXl6zx_uapZbRHhV2VSq1pvENSZSf0qJ0NyIR3fWj-umzeDmNOzD8EQRMV6eAniPgpm1xmBzOI4ZxEuqqa8FJWrGu"
    },
    {
        name: "Kofi Boateng",
        role: "Fleet Manager",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiFH03PqATXcRijsLNAiDZH0wINsl8RD0SWzQXy3T_rv9YzY3cUXWcCbZnHmw50UifCQGZ39ZyAnYZDOK_05a00EqSZBGstkRa5OP3aBZnaM6JzMwIQOErUFWH3hU0zbsC-Kv8tqeYO5XQwdWJJK1P1tI1XdQsFuv-AHV-lzCjG7nVIrTogluMNv85b7cxBaqKdMVH81aibRBnJEreX5hedTkFg8Q-YXOjhSb6QkeE9HA2esw9Qwmi5F5i1muyjZjp_mprBkYzNOdB"
    },
    {
        name: "Akesua Addo",
        role: "Operations Director",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCge_rtojTKvJWf00Jigusv7JB-jtAraYqNAeIE_h9t2lEciKdWYe8kHf9Oxw9xs7BeDJB4vHbt1hCL-L24zRLBXe6ytX5TraOBNuDlI5qKb1i0IZH0ChUyjMoGIC-C1pEMcHi8lUdppRA76SFfI3-x9Kh0ERBcMVrXQ7oOFnvFGe0ShcqepZ72YV66EVIWqsgbk-CwOgiYz5RdpZEcUZgJmZaHbjm1Y5bzXagYvhPskz2sAHSNU2v1MyqdA2zVOTzrXreMcD7QXKWR"
    }
]

export function LeadershipSection() {
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-background-dark relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">THE MINDS BEHIND THE MISSION</h2>
                    <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamConfig.map((member, index) => (
                        <TeamCard key={index} member={member} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TeamCard({ member, index }: { member: any, index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative overflow-hidden glass-panel rounded-xl"
        >
            <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-6 text-center relative z-10 bg-background-dark/80 backdrop-blur-sm border-t border-white/5 -mt-16 mx-4 rounded-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-1">{member.role}</p>
                <h3 className="font-display text-xl text-white">{member.name}</h3>
            </div>

            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </motion.div>
    )
}
