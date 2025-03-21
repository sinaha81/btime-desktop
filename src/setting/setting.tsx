// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
	Typography,
} from '@material-tailwind/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import UpdateModal from './components/updateModal'
import { AboutUs } from './pages/about-us/aboutUs'
import { ArzChandSetting } from './pages/arzChand/arzChand.setting'
import { BtimeSetting } from './pages/btime/btime.setting'
import { ClockSetting } from './pages/clock/clock.setting'
import { NerkhYabSetting } from './pages/nerkhyab/nerkhYab.setting'
import { AppSetting } from './pages/setting/app.setting'
import { WeatherSetting } from './pages/weather/weather.setting'

const queryClient = new QueryClient()

function App() {
	const [open, setOpen] = useState(false)
	useEffect(() => {
		const handleColorSchemeChange = (e) => {
			document.documentElement.classList.remove('dark')
			if (e.matches) {
				document.documentElement.classList.add('dark')
			}
		}

		window.electronAPI.onUpdateDetails(() => {
			setOpen(true)
		})

		const colorSchemeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)',
		)
		handleColorSchemeChange(colorSchemeMediaQuery)

		colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange)

		return () => {
			colorSchemeMediaQuery.removeEventListener(
				'change',
				handleColorSchemeChange,
			)
		}
	}, [])

	function onExitButtonClick() {
		window.close()
	}

	function onClick() {
		setOpen(false)
	}

	const data = [
		{
			label: 'ویجت تاریخ',
			value: 'btime',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
					/>
				</svg>
			),
			element: <BtimeSetting />,
		},
		{
			label: 'ویجت نرخ یاب',
			value: 'currency',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			),
			element: <NerkhYabSetting />,
		},
		{
			label: 'ویجت ارز چند؟',
			value: 'arzChand',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			),
			element: <ArzChandSetting />,
		},
		{
			label: 'ویجت آب و هوا',
			value: 'weather',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
					/>
				</svg>
			),
			element: <WeatherSetting />,
		},
		{
			label: 'ویجت ساعت',
			value: 'clock',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			),
			element: <ClockSetting />,
		},
		{
			label: 'تنظیمات کلی',
			value: 'setting',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
			),
			element: <AppSetting />,
		},
		{
			label: 'درباره ما',
			value: 'about',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-4 dark:text-[#e8e7e7] text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
					/>
				</svg>
			),
			element: <AboutUs />,
		},
	]

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<div className="w-screen h-screen overflow-hidden moveable ">
					<div className="w-full h-7 flex dark:bg-[#14141495] bg-white/65">
						<button
							className="w-7 h-7 ml-5 flex items-center not-moveable group justify-center hover:bg-red-400 dark:hover:bg-[#b94a4aad] transition-colors duration-200 rounded
            "
							onClick={() => onExitButtonClick()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-4 dark:text-[#9d9d9d] text-gray-600 group-hover:text-gray-100"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<div className="flex flex-row h-screen pb-5" dir="rtl">
						<Tabs value="btime" orientation="vertical">
							<TabsHeader
								className="w-36 h-full not-moveable dark:bg-[#1d1d1d5b] rounded-none  bg-white py-5"
								indicatorProps={{
									className: 'bg-white dark:bg-[#1d1d1d]',
								}}
							>
								{data.map(({ label, value, icon }) => (
									<Tab
										key={value}
										value={value}
										className="hover:bg-gray-100 transition-colors duration-200 rounded dark:hover:bg-[#1d1d1d]"
									>
										<div className="flex flex-row items-center gap-2">
											{icon}
											<Typography className="font-[Vazir] font-semibold text-xs dark:text-[#e8e7e7] text-gray-600">
												{label}
											</Typography>
										</div>
									</Tab>
								))}
							</TabsHeader>
							<TabsBody className="w-screen">
								{data.map(({ value, element }) => (
									<TabPanel key={value} value={value} className="h-screen">
										{element}
									</TabPanel>
								))}
							</TabsBody>
						</Tabs>
					</div>
					{open && <UpdateModal onClick={onClick} />}
				</div>
			</QueryClientProvider>
		</>
	)
}

export default App
