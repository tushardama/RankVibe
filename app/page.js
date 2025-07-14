"use client"

import Image from "next/image";
import { useForm } from "react-hook-form";
import { ArrowRight, Copy, LoaderCircle, X } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

export default function Home() {

	const [suggestions, setSuggestions] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log(suggestions);
	}, [suggestions]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();

	const onSubmit = async (data) => {

		try {

			const seed = data.seed.trim();

			setIsLoading(true)

			if (!seed) {
				toast.error("Please enter a valid seed keyword.");
				return;
			}

			const res = await fetch(`/api/suggest?q=${encodeURIComponent(seed)}`);
			if (!res.ok) {
				throw new Error("Failed to fetch suggestions");
			}
			const result = await res.json();

			if (Array.isArray(result.suggestions)) {
				setSuggestions(result.suggestions);
			} else {
				setSuggestions([]);
				toast.error("No suggestions found");
			}


		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}

	}

	const copyKeyword = (keyword) => {
		navigator.clipboard.writeText(keyword)
		toast.success('Keyword Copied !')
	}

	const removeKeyword = (indexToRemove) => {
		const updatedSuggestions = suggestions.filter((_, index) => index !== indexToRemove);
		setSuggestions(updatedSuggestions)
	}

	const copyAll = () => {
		const keywordString = suggestions.join(", ");
		navigator.clipboard.writeText(keywordString)
		toast.success('Suggestions Copied !')
	}

	return (
		<div className="relative w-full overflow-hidden">
			<nav>
				<Image
					src={'/logo.svg'}
					width={160}
					height={160}
					alt="Logo" />
			</nav>
			<div className="container mx-auto hero">
				<Spotlight/>
				<h1><span className="highlight">Supercharge</span> SEO with AI Keyword Generator</h1>
				<p>Streamline Your Content Strategy with RankVibe</p>
				<div className="search-form">
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("seed", {
								required: "Seed is required"
							})}
							type="text"
							placeholder="Enter phrase or keyword"
						/>
						{isLoading ? (
							<button disabled className='filledBtn' type='submit'>
								<LoaderCircle className="animate-spin" />
							</button>
						) : (
							<button className='filledBtn' type='submit'>
								Generate Keywords <ArrowRight />
							</button>
						)}
					</form>
				</div>
				{suggestions.length > 0 && (
					<div className="results mt-6">
						<div className="result-heading">
							<h2>Suggested Keywords</h2>
							<button onClick={copyAll} className="filledBtn">Copy All <Copy /></button>
						</div>
						<div className="suggestions">
							{suggestions.map((keyword, index) => (
								<div className="suggestion" key={index}>
									<div
										contentEditable
										suppressContentEditableWarning
										onBlur={(e) => {
											const newText = e.target.innerText.trim();
											const newSuggestions = [...suggestions];
											newSuggestions[index] = newText;
											setSuggestions(newSuggestions);
										}}
										className="editable-suggestion"
									>
										{keyword}
									</div>
									<button onClick={() => copyKeyword(keyword)}><Copy size={18} /></button>
									<button onClick={() => removeKeyword(index)}><X size={18} color="red" /></button>
								</div>
							))}
						</div>
					</div>
				)}
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
			<ToastContainer
				position="top-right"
				theme="dark"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
			/>
		</div>
	);
}
