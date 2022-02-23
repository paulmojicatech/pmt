import styles from './header.module.scss';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

export const PmtHeader = (props: { backgroundUrl: string }) => {
  const [anchorElement, setAnchorElement] = useState(undefined);
  const handleMenuOpen = (event) => setAnchorElement(event.currentTarget);
  const handleMenuClose = () => setAnchorElement(null);
  const isOpen = !!anchorElement;
  const isMobile = useMediaQuery('(max-width: 800px)');
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
    <Fragment>
      <div className={styles.headerContainer} style={getBackgroundStyle()}>
        <header className={styles.topContainer}>
          <div className={styles.title}>KIRSTIN R. ABRAHAM, LCSW</div>
          <div className={styles.menuItems}>
            {isMobile && (
              <Fragment>
                <MenuIcon
                  id="menuButton"
                  onClick={handleMenuOpen}
                  className={styles.menuIconButton}
                  fontSize="large"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                />
                <Menu
                  MenuListProps={{
                    'aria-labelledby': 'menuButton',
                  }}
                  anchorEl={anchorElement}
                  open={isOpen}
                  onClose={handleMenuClose}
                >
                  {getRoutes().map((route) => {
                    return (
                      <MenuItem key={route.routePath}>
                        <Link href={route.routePath}>{route.dispalyName}</Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Fragment>
            )}
            {!isMobile &&
              getRoutes().map((route) => {
                return (
                  <Link key={route.routePath} href={route.routePath}>
                    {route.dispalyName}
                  </Link>
                );
              })}
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default PmtHeader;
