import { useEffect, useState } from 'react'
import { type CurrencyData, getRateByCurrency } from '../api/api'
import { widgetKey } from '../../shared/widgetKey'
import type { ArzChandSettingStore } from 'electron/store'
import { CurrenciesDefault } from './templates/default'
import { CurrenciesClassic } from './templates/classic'

function App() {
	const [currencies, setCurrencies] = useState<
		(CurrencyData & { imgColor; code })[]
	>([])
	const [reloading, setReloading] = useState(true)

	const [setting, setSetting] = useState<ArzChandSettingStore>(
		window.store.get(widgetKey.ArzChand),
	)

	const [isTransparent, setIsTransparent] = useState<boolean>(false)
	const [isBackgroundActive, setBackgroundActive] = useState<boolean>(false)

	useEffect(() => {
		const handleColorSchemeChange = (e) => {
			document.documentElement.classList.remove('dark')
			if (e.matches) {
				document.documentElement.classList.add('dark')
			}
		}

		const colorSchemeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)',
		)

		handleColorSchemeChange(colorSchemeMediaQuery)

		const observer = new MutationObserver(() => {
			setIsTransparent(
				document
					.querySelector('.h-screen')
					?.classList?.contains('transparent-active'),
			)
		})

		const observerBackground = new MutationObserver(() => {
			setBackgroundActive(
				document.querySelector('.h-screen')?.classList?.contains('background'),
			)
		})

		observer.observe(document.querySelector('.h-screen'), {
			attributes: true,
			attributeFilter: ['class'],
		})

		observerBackground.observe(document.querySelector('.h-screen'), {
			attributes: true,
			attributeFilter: ['class'],
		})

		colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange)

		window.ipcRenderer.on('updated-setting', () => {
			const arzChandSetting = window.store.get(widgetKey.ArzChand)
			setSetting(arzChandSetting)
			setReloading(true)
		})

		return () => {
			colorSchemeMediaQuery.removeEventListener(
				'change',
				handleColorSchemeChange,
			)
			observer.disconnect()
			observerBackground.disconnect()
		}
	}, [])

	useEffect(() => {
		if (reloading) {
			setCurrencies([])
		}

		const currencyList = setting.currencies || []

		async function fetchData() {
			const newCurrencies = []

			for (const currency of currencyList) {
				const data = await getRateByCurrency(currency)
				if (data) {
					newCurrencies.push({ ...data, imgColor: '', code: currency })
				}
			}

			setCurrencies((prev) => {
				const uniqueCurrencies = [...prev]

				for (const newCurrency of newCurrencies) {
					const existingIndex = uniqueCurrencies.findIndex(
						(c) => c.icon === newCurrency.icon,
					) // Assume there's an 'id' field
					if (existingIndex !== -1) {
						// Update existing currency
						uniqueCurrencies[existingIndex] = newCurrency
					} else {
						// Add new currency
						uniqueCurrencies.push(newCurrency)
					}
				}

				return uniqueCurrencies
			})
			setReloading(false)
		}

		if (reloading) {
			fetchData()
		}
	}, [reloading, setting.currencies])

	return (
		<div className="moveable h-screen w-screen overflow-hidden">
			<div className="h-full">
				<div className="flex flex-col p-2 h-full  items-center">
					{setting.template === 'default' || !setting.template ? (
						<CurrenciesDefault
							currencies={currencies}
							isBackgroundActive={isBackgroundActive}
							isTransparent={isTransparent}
						/>
					) : (
						<CurrenciesClassic
							currencies={currencies}
							isTransparent={isTransparent}
							isBackgroundActive={isBackgroundActive}
						/>
					)}
					<div
						className="flex w-full p-2 h-10 items-center overflow-clip mt-2 transition-all duration-300 ease-in-out"
						dir="rtl"
					>
						<button
							className={`w-7 h-7 not-moveable flex justify-center items-center rounded-full 
                cursor-pointer   hover:text-gray-300 dark:hover:bg-[#3c3c3c8a] dark:text-gray-400/90
                dark:bg-transparent
                 ${isTransparent ? 'text-gray-300' : 'text-gray-500'} 
                
                ${reloading ? 'animate-spin' : 'animate-none'}
                `}
							style={{ backdropFilter: 'blur(20px)' }}
							onClick={() => setReloading(true)}
							disabled={reloading}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
//bg-gray-400/50
