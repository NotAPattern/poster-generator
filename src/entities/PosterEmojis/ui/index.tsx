import { usePosterStore } from '@/app/stores/posterStore'
import { create as createRandom } from 'random-seed'
import { type FC } from 'react'
import styles from './PosterEmojis.module.sass'

type EmojisProps = {
  posterSize: { width: number; height: number } | undefined
}

const EMOJI_MIN_SIZE = 2
const EMOJI_MAX_SIZE = 7

export const PosterEmojis: FC<EmojisProps> = ({ posterSize }) => {
  const emojis = usePosterStore((state) => state.poster.emojis)?.split(' ')
  const rerender = usePosterStore((state) => state.poster.rerender)
  const rand = createRandom()
  // rand.seed('42')
  return (
    <>
      {posterSize
        && emojis?.map((emoji, index) => {
          const emojiSize = rand.floatBetween(EMOJI_MIN_SIZE, EMOJI_MAX_SIZE)
          const emojiRotation = Number(`${rand(2) ? '' : '-'}${rand(45)}`)
          const emojiOffset = emojiSize / 2
          return (
            <div
              key={`emoji-${index}`}
              className={styles['PosterEmoji']}
              style={{
                left: rand(posterSize.width - emojiOffset),
                top: rand(posterSize.height - emojiOffset),
                fontSize: `${emojiSize}rem`,
                transform: `rotate(${emojiRotation}deg)`,
              }}
            >
              {emoji}
            </div>
          )
        })}
    </>
  )
}
