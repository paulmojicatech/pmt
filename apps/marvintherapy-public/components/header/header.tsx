import styles from './header.module.scss';
import Link from 'next/link';

export const PmtHeader = (props: { backgroundUrl: string }) => {
  function getBackgroundStyle(): { [key: string]: string } {
    return {
      backgroundImage: 'url(' + props.backgroundUrl + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
      height: '30rem',
    };
  }

  function getRoutes(): { dispalyName: string; routePath: string }[] {
    return [
      {
        dispalyName: 'Home',
        routePath: '/',
      },
      {
        dispalyName: 'About Me',
        routePath: '/about',
      },
      {
        dispalyName: 'Services Provided',
        routePath: '/services',
      },
      {
        dispalyName: 'Helpful Forms',
        routePath: '/helpfulForms',
      },
      {
        dispalyName: 'Rates and Insurance',
        routePath: '/rates',
      },
    ];
  }

  return (
    <div className={styles.headerContainer} style={getBackgroundStyle()}>
      <header className={styles.topContainer}>
        <div className={styles.title}>KIRSTIN R. ABRAHAM, LCSW</div>
        <div className={styles.menuItems}>
          {getRoutes().map((route) => {
            return (
              <Link key={route.routePath} href={route.routePath}>
                {route.dispalyName}
              </Link>
            );
          })}
        </div>
      </header>
    </div>
  );
};

export default PmtHeader;
