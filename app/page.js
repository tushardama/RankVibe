import Image from "next/image";

export default function Home() {
	return (
		<div>
			<nav>
				<Image 
				src={'/logo.svg'}
				width={80}
				height={80}
				alt="Logo" />
			</nav>
		</div>
	);
}
