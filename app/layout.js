import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "RankVibe - Google Keyword Generator",
	description: "Generate keyword suggestions instantly from Google Suggest.",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "RankVibe - Google Keyword Generator",
		description: "Generate keyword suggestions instantly from Google Suggest.",
		url: "https://rankvibehq.netlify.app/",
		siteName: "RankVibe",
		images: [
			{
				url: "/og.jpg", // Path relative to public/
				width: 1200,
				height: 630,
				alt: "RankVibe OG Image",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "RankVibe - Google Keyword Generator",
		description: "Generate keyword suggestions instantly from Google Suggest.",
		images: ["/og.jpg"],
	},
};


export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
