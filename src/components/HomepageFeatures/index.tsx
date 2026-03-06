import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type SectionItem = {
  title: string;
  description: ReactNode;
  to: string;
  comingSoon?: boolean;
};

const SectionList: SectionItem[] = [
  {
    title: 'Developer Guide',
    description: (
      <>
        Use the Strata CLI and learn semantic modeling. Define tables and
        relationships, and understand the semantic engine—all from your
        machine.
      </>
    ),
    to: 'developer-guide',
  },
  {
    title: 'Self-Hosting Guide',
    description: (
      <>
        Install and self-host Strata in your environment. Deployment options,
        configuration, and operations for enterprise hosting.
      </>
    ),
    to: 'self-hosting',
  },
  {
    title: 'Web UI Guide',
    description: (
      <>
        Use the Strata app after deployment: exploring data, running
        workflows, and self-service BI. Documentation coming soon.
      </>
    ),
    to: 'web-ui',
    comingSoon: true,
  },
];

function SectionCard({
  title,
  description,
  to,
  comingSoon,
}: SectionItem) {
  return (
    <div className={clsx('col col--4', styles.sectionCol)}>
      <Link to={to} className={styles.sectionCard}>
        <Heading as="h3" className={styles.sectionTitle}>
          {title}
          {comingSoon && (
            <span className={styles.comingSoon}>Coming soon</span>
          )}
        </Heading>
        <p className={styles.sectionDescription}>{description}</p>
        <span className={styles.sectionCta}>
          {comingSoon ? 'Learn more' : 'Go to overview →'}
        </span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <p className={styles.sectionsIntro}>
          Choose a section below to start. Each link takes you to the overview
          for that area; from there you can follow the same navigation as today.
        </p>
        <div className="row">
          {SectionList.map((props, idx) => (
            <SectionCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
