import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Day 0-2 validation',
    Svg: require('@site/static/img/check.svg').default,
    description: (
      <>
        Define rules and execute them before deploying to validate your environment. Allow continuous validation to run and alert to ensure your environment remains valid.
      </>
    ),
  },
  {
    title: 'Kubernetes-native',
    Svg: require('@site/static/img/k8s_logo.svg').default,
    description: (
      <>
        Use Kubernetes CRs (custom resources) to define rules. Official plugins and community plugins consume the CRs to perform validation.
      </>
    ),
  },
  {
    title: 'Intuitive CLI',
    Svg: require('@site/static/img/undraw_programmer.svg').default,
    description: (
      <>
        Use validatorctl to set up Validator for your environment, define rules, and execute them.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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

// export default function HomepageReadMore(): JSX.Element {
//   return (
//     <section className={styles.features}>
//       read more
//     </section>
//   )
// }
