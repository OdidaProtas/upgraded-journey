<script lang="ts">
	import { browser } from '$app/environment';
	import '@fontsource/merriweather';
	import { onDestroy, onMount } from 'svelte';
	import { FY2021 } from '$lib/chart.json';

	let chartType = 'pie';

	let barChartElement: HTMLCanvasElement;

	let lineChartElement: HTMLCanvasElement;

	const chartData = {
		labels: FY2021.map((item) => item.framework),
		datasets: [
			{
				label: chartType,
				data: FY2021.map((item) => item.score),
				backgroundColor: [
					'hsl(347 38% 49%)',
					'hsl(346 65% 63%)',
					'hsl(346 49% 56%)',
					'hsl(346 89% 70%)',
					'hsl(346 90% 76%)',
					'hsl(346 90% 73%)',
					'hsl(346 89% 79%)',
					'hsl(346 89% 85%)',
					'hsl(347 89% 82%)',
					'hsl(346 90% 88%)',
					'hsl(347 87% 94%)',
					'hsl(347 91% 91%)',
					'hsl(346 87% 97%)'
				],
				borderColor: ['hsl(43 100% 52%)'],
				borderRadius: 4,
				borderWidth: 2
			}
		]
	};

	let interval: any;

	onMount(async () => {
		const { Chart, registerables } = await import('chart.js');
		Chart.register(...registerables);

		if (browser) {
			new Chart(barChartElement, {
				type: chartType as any,
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						// x: {
						// 	grid: {
						// 		color: 'hsl(43 100% 52% / 10%)'
						// 	},
						// 	ticks: { color: 'hsl(43 100% 52% )' }
						// },
					}
				}
			});

			new Chart(lineChartElement, {
				type: 'line',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						// x: {
						// 	grid: {
						// 		color: 'hsl(43 100% 52% / 10%)'
						// 	},
						// 	ticks: { color: 'hsl(43 100% 52% )' }
						// },
					}
				}
			});
			// interval = setInterval(() => {
			// 	let types = ['pie', 'bar', 'line'];
			// 	chartType = types[Math.ceil(Math.random() * types.length)];
			// 	console.log(chartType);
			// }, 4000);
		}
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<main class="main-container">
	<div class="flex mb-6">
		<small class="flex-1">Interactive charts</small>
	</div>
	<section class="max-h-44 flex justify-center">
		<canvas bind:this={barChartElement} />
	</section>
	<div class="mt-3 text-xs">
		<hr class="mb-2" />
		<section class="max-h-44 flex justify-center">
			<canvas bind:this={lineChartElement} />
		</section>
		<div class="mt-3">
			Get rich dashboards, with all tools to visualize, analyze and get insights on your data.
		</div>
	</div>
</main>
