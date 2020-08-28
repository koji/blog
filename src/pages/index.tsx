import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import GitHub from '../components/svgs/github'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <img src="/demo.png" width="60%" alt="page top" />
      <h1>Koji Notion Blog</h1>
      <h2></h2>

      {/* <Features /> */}

      <div className="explanation">
        <p>About this blog</p>
      </div>
    </div>
  </>
)
