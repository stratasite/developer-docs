import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Semantic Modeling',
    description: (
      <>
        Build powerful semantic models that abstract your data sources and provide
        business-friendly interfaces for analytics.
      </>
    ),
  },
  {
    title: 'YAML-Based Configuration',
    description: (
      <>
        Define your models using simple YAML configuration files. Version control
        your semantic layer alongside your code.
      </>
    ),
  },
  {
    title: 'CLI Tools',
    description: (
      <>
        Powerful command-line tools for validating, testing, and deploying your
        semantic models with confidence.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
