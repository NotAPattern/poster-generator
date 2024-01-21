import styles from './PosterDescription.module.sass'

const Description = () => {
  return (
    <>
      <p>
        В свободном формате:
      </p>
      <ul>
        <li>решаем задачи</li>
        <li>проходим онлайн-курсы</li>
        <li>работаем над пет-проектами</li>
        <li>помогаем друг другу</li>
      </ul>
    </>
  )
}

export const PosterDescription = () => {
  return (
    <div className={styles['PosterDescription']}>
      <Description />
    </div>
  )
}
