import {HermitCardT} from 'types/cards'
import css from './hermit-card-svg.module.css'
import classnames from 'classnames'

export type HermitCardProps = {
	card: HermitCardT
}

const COST_PAD = 20
const COST_SIZE = 28
const COST_X = [
	[COST_PAD + COST_SIZE],
	[COST_PAD + COST_SIZE / 2, COST_PAD + COST_SIZE + COST_SIZE / 2],
	[COST_PAD, COST_PAD + COST_SIZE, COST_PAD + COST_SIZE * 2],
]

const HermitCard = ({card}: HermitCardProps) => {
	const hermitFullName = card.id.split('_')[0]
	return (
		<svg className={css.card} width="100%" height="100%" viewBox="0 0 400 400">
			<defs>
				<clipPath id="myClip">
					<rect x="55" y="65" width="290" height="185" />
				</clipPath>
			</defs>
			<rect
				className={css.cardBackground}
				x="10"
				y="10"
				width="380"
				height="380"
				rx="15"
				ry="15"
			/>
			<text x="45" y="17" className={css.name}>
				{card.name}
			</text>
			<text x="300" y="17" className={css.health}>
				{card.health}
			</text>
			<g id="hermit-image">
				<rect x="45" y="55" fill="white" width="310" height="205" />
				<image
					href="/images/bg5.png"
					x="55"
					y="65"
					width="290"
					clipPath="url(#myClip)"
				/>
				<image
					href={`/images/hermits-nobg/${hermitFullName}.png`}
					x="55"
					y="75"
					width="290"
					clipPath="url(#myClip)"
				/>
			</g>
			<g id="hermit-type">
				<rect
					className={css.hermitTypeBackground}
					x="315"
					y="-5"
					width="100"
					height="100"
					rx="50"
					ry="50"
				/>
				<image
					x="327"
					y="12"
					width="68"
					height="68"
					href={`/images/types/type-${card.hermitType}.png`}
					className={css.hermitType}
				/>
			</g>
			{['rare', 'ultra_rare'].includes(card.rarity) ? (
				<image
					x="60"
					y="70"
					width="60"
					height="60"
					href={`/images/rarities/${card.rarity}.png`}
					className={css.rarity}
				/>
			) : null}
			<g id="hermit-attacks" className={css.hermitAttacks}>
				<g>
					{card.primary.cost.map((type, i) => (
						<image
							key={i}
							href={`/images/types/type-${type}.png`}
							x={COST_X[card.primary.cost.length - 1][i]}
							y="277"
							width={COST_SIZE}
							height={COST_SIZE}
						/>
					))}
				</g>
				<text x="200" y="278" className={css.attackName}>
					{card.primary.name}
				</text>
				<text
					x="380"
					y="275"
					className={classnames(css.attackDamage, {
						[css.specialMove]: !!card.primary.power,
					})}
				>
					{card.primary.damage === 0 ? '00' : card.primary.damage}
				</text>
				<rect x="20" y="320" width="360" height="10" fill="white" />
				{card.secondary.cost.map((type, i) => (
					<image
						key={i}
						href={`/images/types/type-${type}.png`}
						x={COST_X[card.secondary.cost.length - 1][i]}
						y="347"
						width={COST_SIZE}
						height={COST_SIZE}
					/>
				))}
				<text x="200" y="348" className={css.attackName}>
					{card.secondary.name}
				</text>
				<text
					x="380"
					y="345"
					className={classnames(css.attackDamage, {
						[css.specialMove]: !!card.secondary.power,
					})}
				>
					{card.secondary.damage === 0 ? '00' : card.secondary.damage}
				</text>
			</g>
		</svg>
	)
}

export default HermitCard
