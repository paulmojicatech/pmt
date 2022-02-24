import styles from './header.module.scss';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

export const PmtHeader = (props: { backgroundUrl: string }) => {
  const [anchorElement, setAnchorElement] = useState(undefined);
  const [moreAnchorElement, setMoreAnchorElement] = useState(undefined);
  const handleMenuOpen = (event) => setAnchorElement(event.currentTarget);
  const handleMenuClose = () => setAnchorElement(null);
  const handleMoreMenuOpen = (event) =>
    setMoreAnchorElement(event.currentTarget);
  const handleMoreMenuClose = () => setMoreAnchorElement(null);
  const isOpen = !!anchorElement;
  const isMoreOpen = !!moreAnchorElement;
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

  function getMoreRoutes(): { displayName: string; routePath: string }[] {
    return [
      {
        displayName: 'Make a Payment',
        routePath: '/payment',
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
                  aria-controls={isOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isOpen ? 'true' : undefined}
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
            <Button
              className={styles.moreButton}
              id="moreButton"
              onClick={handleMoreMenuOpen}
              aria-controls={isMoreOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMoreOpen ? 'true' : undefined}
            >
              More
            </Button>
            <Menu
              MenuListProps={{
                'aria-labelledby': 'moreButton',
              }}
              anchorEl={moreAnchorElement}
              open={isMoreOpen}
              onClose={handleMoreMenuClose}
            >
              {getMoreRoutes().map((moreItem) => {
                return (
                  <MenuItem key={moreItem.routePath}>
                    <Link href={moreItem.routePath}>
                      {moreItem.displayName}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </header>
      </div>
    </Fragment>
  );
};

export default PmtHeader;
