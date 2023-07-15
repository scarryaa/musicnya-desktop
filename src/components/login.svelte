<script lang="ts">
	import { goto } from '$app/navigation';
	import { hide } from '../lib/services/modal.service';
</script>

<div class="login-wrapper">
	<div class="login-wrapper__greeting">
		<p>Hello!</p>
		<p>
			musicnya requires an active Apple Music account. Please sign in below to access all
			functionality.
		</p>
		<p>
			Alternatively, you can continue without signing in, but functionality will be very limited.
		</p>
		<p>We hope you enjoy using the app! Feel free to submit any feedback at</p>
		<a href="https://github.com/scarryaa/musicnya-desktop" target="_blank"
			>https://github.com/scarryaa/musicnya-desktop</a
		>
		<div class="login-wrapper__greeting__buttons">
			<button
				class="button button--primary"
				on:click={async () =>
					await MusicKit.getInstance()
						.authorize()
						.finally(() => {
							hide();
							window.location.reload();
						})}>Sign in with Apple Music</button
			>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../variables.scss' as *;

	.login-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		padding: 0 1rem;

		&__greeting {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			text-align: center;
			max-width: 30rem;
			margin: 0 auto;

			p {
				margin: 0;
			}
		}

		&__greeting__buttons {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			margin-top: 1rem;
		}

		&__greeting__buttons button {
			width: 10rem;
			background-color: #9c1f1f;
			color: #fff;
			border: none;
			border-radius: 0.5rem;
			padding: 0.5rem 1rem;
		}
	}
</style>
