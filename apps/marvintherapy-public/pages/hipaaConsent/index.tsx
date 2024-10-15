import styles from './hipaaConsent.module.scss';
import {PmtHeader} from '../../components/header/header';
import { Fragment, useState } from 'react';
import {P1, P2, P3, P4} from '../../public/content/hipaa-consent-content.const';
import {usePDF} from 'react-to-pdf';
import {v4} from 'uuid';

export function HipaaConsent() {   
  const initialState = {
    hasSignedClientSignature: false,
    hasSignedFamilySignature: false,
    hasSignedParentSignature: false,
    currentDialogOpen: '',
    isDialogVisible: false,
    clientSignature: '',
    familySignature: '',
    parentSignature: '',
    fileName: `${v4()}.pdf`
  };
  const [currentState, setState] = useState(initialState);
  const {hasSignedClientSignature, hasSignedFamilySignature, hasSignedParentSignature, isDialogVisible, clientSignature, familySignature, parentSignature} = currentState;

  const {toPDF, targetRef} = usePDF({filename: currentState.fileName});

  const handleShowDialog = (currentDialogOpen: string) => {    
    const dialog = document.getElementById('consentDialog') as HTMLDialogElement;
    if (!dialog.open) {
      dialog.showModal();
      setState({
        ...currentState,
        isDialogVisible: true,
        currentDialogOpen
      });
    }    
  };
  const handleCancel = () => {
    const dialog = document.getElementById('consentDialog') as HTMLDialogElement;
    const nameText = document.getElementById('nameText') as HTMLInputElement;
    dialog.close();
    setState({...currentState, isDialogVisible: false, currentDialogOpen: ''});
    nameText.value = '';
  };

  const handleSignAndAgree = () => {
    const nameText = document.getElementById('nameText') as HTMLInputElement;
    const dialog = document.getElementById('consentDialog') as HTMLDialogElement;
    dialog.returnValue = nameText.value;
    switch (currentState.currentDialogOpen) {
      case 'hasSignedClientSignature': {
        setState({...currentState, isDialogVisible: false, hasSignedClientSignature: true, clientSignature: nameText.value, currentDialogOpen: ''});    
        break;
      }
      case 'hasSignedFamilySignature': {
        setState({...currentState, isDialogVisible: false, hasSignedFamilySignature: true, familySignature: nameText.value, currentDialogOpen: ''});    
        break;
      }
      case 'hasSignedParentSignature': {
        setState({...currentState, isDialogVisible: false, hasSignedParentSignature: true, parentSignature: nameText.value, currentDialogOpen: ''});
        break;
      }
      default:
        break;
    }
    nameText.value = '';
    dialog.close();
  };

  const handleEmailForm = async () => {
    const pdf = await toPDF();
    console.log(pdf);
    const updatedFileName = `${v4()}.pdf`;
    setState({...currentState, fileName: updatedFileName});
  };

  return (
    <Fragment>
      <PmtHeader backgroundUrl="/images/aboutMe.jpg" />      
        <section className={styles.container}>
          <h1 className={`${styles.header}`}>Agreement & Consent For Treatment</h1>
          <div className={styles.emailButtonContainer}>
            <button onClick={() => handleEmailForm()} disabled={!hasSignedClientSignature} className={styles.primaryButton}>Email Form</button>
          </div>
          <div className={styles.pdfContainer} ref={targetRef}>
          <article className={styles.mb1Rem}>{P1}</article >
          <article className={styles.mb1Rem}>{P2}</article>
          <article className={styles.mb1Rem}>{P3}</article>
          <article className={`${styles.mb2Rem} ${styles.bold}`}>{P4}</article>
          <div className={styles.approvalContainer}>            
            <span>Client Signature</span>
            {!hasSignedClientSignature && <button className={`${styles.primaryButton} ${styles.ml1Rem}`} onClick={() => handleShowDialog('hasSignedClientSignature')}>Click to sign</button>}
            {hasSignedClientSignature && <span className={`${styles.cursive} ${styles.ml1Rem}`}>{clientSignature}</span>}
          </div>
          <div className={styles.approvalContainer}>
            <span>Signature of Spouse if family/marital counseling</span>
            {!hasSignedFamilySignature && <button className={`${styles.primaryButton} ${styles.ml1Rem}`} onClick={() => handleShowDialog('hasSignedFamilySignature')}>Click to sign</button>}
            {hasSignedFamilySignature && <span className={`${styles.cursive} ${styles.ml1Rem}`}>{familySignature}</span>}
          </div>
          <div className={styles.approvalContainer}>
            <span>Signature of parent or guardian if client is a minor</span>
            {!hasSignedParentSignature && <button className={`${styles.primaryButton} ${styles.ml1Rem}`} onClick={() => handleShowDialog('hasSignedParentSignature')}>Click to sign</button>}
            {hasSignedParentSignature && <span className={`${styles.cursive} ${styles.ml1Rem}`}>{parentSignature}</span>}
          </div>
          </div>          
        </section>
        <dialog id="consentDialog" className={`${styles.dialogContainer} ${isDialogVisible ? styles.visible : ''}`}>    
          <div className={styles.dialogHeader}>
            <button className={styles.bgTransparent} onClick={() => handleCancel()}>X</button>
          </div>
          <div className={styles.dialogBody}>
            <article>By entering your name, you agree to the terms above.</article>
            <input type="text" placeholder="Enter Name" id="nameText" />  
          </div>      
          <div className={styles.dialogFooter}>
            <button onClick={() => handleCancel()} className={`${styles.cancelButton}`}>Cancel</button>
            <button onClick={() => handleSignAndAgree()} className={`${styles.primaryButton} ${styles.signAgreeButton}`}>Sign</button>
          </div>
        </dialog>
    </Fragment>    
  );  
}

export default HipaaConsent;