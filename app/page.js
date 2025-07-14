"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

export default function Home() {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {

		try {

			

		} catch (err) {
			console.log(err);
		}

	}

	return (
		<div>
			<ToastContainer
				position="top-right"
				theme="dark"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
			/>
			<nav>
				<Image
					src={'/logo.svg'}
					width={160}
					height={160}
					alt="Logo" />
			</nav>
			<div className="container mx-auto hero">
				<Spotlight />
				<h1><span className="highlight">Supercharge</span> YouTube SEO with AI Keyword Generator</h1>
				<p>Streamline Your Content Strategy with RankVibe</p>
				<div className="search-form">
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("text", {
								required: "Seed is required"
							})}
							type="text"
							placeholder="Enter phrase or keyword"
						/>
						<button className='filledBtn' type='submit'>Generate Keywords <ArrowRight /></button>
					</form>
				</div>
				<div className="result">

				</div>
			</div>
			<section className="sec1">
				<Image
					src={'/1.png'}
					width={500}
					height={500}
					alt="Logo" />
				<div className="flex flex-col gap-4">
					<h1><span className="text-accent">#1</span> SEO Tools for Ranking with Vibe</h1>
					<p>Crafted to Get You to the Top &#45; Faster and Smarter</p>
				</div>
			</section>
			<section className="sec2">
				<div className="flex flex-col gap-4 text-center">
					<h1><span className="text-accent">Plant</span> your Success with Rank Vibe</h1>
					<p>Let your ideas take root and grow into a thriving, wealth-generating masterpiece.</p>
				</div>
				<Image
					src={'/2.png'}
					width={600}
					height={600}
					alt="Logo" />
			</section>
		</div>
	);
}
