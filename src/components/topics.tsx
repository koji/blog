import Twitter from './svgs/twitter'
import GitHub from './svgs/github'
import LinkedIn from './svgs/linkedin'

const topics = [
  {
    text: 'GitHub',
    icon: GitHub,
  },
  {
    text: 'Twitter',
    icon: Twitter,
  },
  {
    text: 'LinkedIn',
    icon: LinkedIn,
  },
]

export default () => (
  <div className="features">
    {topics.map(({ text, icon: Icon }) => (
      <div className="feature" key={text}>
        {Icon && <Icon height={24} width={24} />}
        <h4>{text}</h4>
      </div>
    ))}
  </div>
)
