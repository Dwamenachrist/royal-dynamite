"use client"

import { useState } from "react"
import { Review } from "@/types"
import { Star, CheckCircle2, User, ThumbsUp, MessageSquarePlus, ChevronDown, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface RentalReviewsProps {
    reviews: Review[]
    className?: string
}

export function RentalReviews({ reviews, className }: RentalReviewsProps) {
    const [isWriting, setIsWriting] = useState(false)

    // Calculate Summary Stats
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
        : "0.0"

    // Calculate Distribution
    const distribution = [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => r.rating === star).length
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
        return { star, count, percentage }
    })

    return (
        <div className={cn("space-y-8", className)}>

            {/* ─── Summary Bar ─── */}
            <div className="bg-[#112240]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#edbc1d]/5 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
                    {/* Score */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="text-5xl font-bold text-white tracking-tighter leading-none font-display">
                            {averageRating}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={cn(
                                            "w-4 h-4",
                                            star <= Math.round(parseFloat(averageRating)) ? "text-[#edbc1d] fill-[#edbc1d]" : "text-gray-700 fill-gray-900/50"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-400 font-medium">{totalReviews} verified reviews</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-12 bg-white/10" />

                    {/* Distribution Bars */}
                    <div className="flex-1 w-full space-y-1.5">
                        {distribution.map(({ star, percentage }) => (
                            <div key={star} className="flex items-center gap-2 text-xs group">
                                <div className="flex items-center gap-1 w-8 text-gray-500 font-medium shrink-0">
                                    <span>{star}</span>
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="h-full bg-[#edbc1d] rounded-full"
                                    />
                                </div>
                                <span className="w-8 text-right text-gray-600 font-mono text-[10px]">{percentage.toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-12 bg-white/10" />

                    {/* Write Review CTA */}
                    <div className="shrink-0">
                        <Button
                            onClick={() => setIsWriting(!isWriting)}
                            className="bg-[#edbc1d] hover:bg-yellow-400 text-[#0a192f] font-bold border-none px-6 py-5 text-sm rounded-xl transition-all transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(237,188,29,0.3)]"
                        >
                            <MessageSquarePlus className="w-4 h-4 mr-2" />
                            Write a Review
                        </Button>
                    </div>
                </div>
            </div>

            {/* ─── Reviews Header ─── */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-display">
                    Latest Reviews
                </h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 h-8 px-3 rounded-lg text-xs">
                        <Filter className="w-3 h-3 mr-1.5" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 h-8 px-3 rounded-lg text-xs">
                        Recent
                        <ChevronDown className="w-3 h-3 ml-1.5" />
                    </Button>
                </div>
            </div>

            {/* ─── Reviews List ─── */}
            {reviews.length === 0 ? (
                <div className="text-center py-16 bg-[#112240]/30 rounded-2xl border border-white/5 border-dashed">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquarePlus className="w-6 h-6 text-gray-600" />
                    </div>
                    <h4 className="text-lg text-white font-bold mb-1 font-display">No reviews yet</h4>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto">Be the first to share your experience with this vehicle.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-[#112240]/40 backdrop-blur-sm border border-white/5 rounded-xl p-5 hover:border-[#edbc1d]/20 transition-all duration-300 group"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {review.avatar ? (
                                            <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-4 h-4 text-gray-500" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-white text-sm font-display">{review.author}</h4>
                                            {review.verified && (
                                                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#edbc1d] bg-[#edbc1d]/10 border border-[#edbc1d]/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            {review.role && (
                                                <>
                                                    <span className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">{review.role}</span>
                                                    <span className="w-0.5 h-0.5 bg-gray-600 rounded-full" />
                                                </>
                                            )}
                                            <span className="text-gray-500 text-[10px]">{new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 shrink-0">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                "w-3.5 h-3.5",
                                                star <= review.rating ? "text-[#edbc1d] fill-[#edbc1d]" : "text-gray-700 fill-gray-900"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Review Content */}
                            <p className="text-gray-300 leading-relaxed text-sm pl-[52px]">
                                {review.content}
                            </p>

                            {/* Review Actions */}
                            <div className="flex items-center gap-4 pt-3 mt-3 border-t border-white/5 pl-[52px]">
                                <button className="text-[10px] font-medium text-gray-600 hover:text-[#edbc1d] flex items-center gap-1.5 transition-colors">
                                    <ThumbsUp className="w-3 h-3" />
                                    Helpful
                                </button>
                                <button className="text-[10px] font-medium text-gray-600 hover:text-red-400 transition-colors">
                                    Report
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Write Review Modal (Mock) */}
            <AnimatePresence>
                {isWriting && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 max-w-md w-full relative shadow-2xl"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-1 font-display">Rate Your Experience</h3>
                                <p className="text-gray-400 text-sm">How was your rental?</p>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-center gap-2 mb-6">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button key={star} className="text-gray-700 hover:text-[#edbc1d] transition-colors hover:scale-110 transform duration-200 p-1">
                                            <Star className="w-7 h-7 fill-current" />
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 ml-1">Your Review</label>
                                    <div className="bg-[#1e293b] rounded-xl border border-white/10 p-3 min-h-[100px] text-gray-500 text-sm">
                                        Tell us more about your trip...
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsWriting(false)}
                                        className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 py-5 rounded-xl text-sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => setIsWriting(false)}
                                        className="w-full bg-[#edbc1d] text-[#0a192f] hover:bg-yellow-400 font-bold py-5 rounded-xl shadow-lg shadow-yellow-500/10 text-sm"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
