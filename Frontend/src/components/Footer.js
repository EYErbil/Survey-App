import React from 'react';
import { Box, Typography, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import BookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        p: 2,
        backgroundColor: 'background.paper',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
<Box>
        <Typography variant="h6" component="div" gutterBottom>
          KURUMSAL
        </Typography>
        <Link
          href="https://tubitak.gov.tr/tr/kurumsal/politikalar/iletisim"
          color="inherit"
          underline="none"
          display="block"
        >
          Politikalar
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/kurumsal/hakkimizda/mevzuat"
          color="inherit"
          underline="none"
          display="block"
        >
          Mevzuat
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/kurumsal/uluslararasi"
          color="inherit"
          underline="none"
          display="block"
        >
          Uluslararası
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/baskanlik-birimleri"
          color="inherit"
          underline="none"
          display="block"
        >
          Başkanlık Birimleri
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/merkez-enstituler"
          color="inherit"
          underline="none"
          display="block"
        >
          Merkez & Enstitüler
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/kvkk"
          color="inherit"
          underline="none"
          display="block"
        >
          KVKK
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/bidb-bilgi-guvenligi-politikasi"
          color="inherit"
          underline="none"
          display="block"
        >
          BİDB - Bilgi Güvenliği Politikası
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/destekler/akademik/uygulamalar-ve-yonergeler/tts-transfer-takip-sistemi"
          color="inherit"
          underline="none"
          display="block"
        >
          Transfer Takip Sistemi (TTS)
        </Link>
      </Box>
      <Box>
        <Typography variant="h6" component="div" gutterBottom>
          ARŞİV
        </Typography>
        <Link
          href="https://tubitak.gov.tr/tr/haberler"
          color="inherit"
          underline="none"
          display="block"
        >
          Haber Arşivi
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/duyuru"
          color="inherit"
          underline="none"
          display="block"
        >
          Duyuru Arşivi
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/fotograf-arsivi"
          color="inherit"
          underline="none"
          display="block"
        >
          Fotoğraf Arşivi
        </Link>
        <Link
          href="https://tubitak.gov.tr/tr/video-arsivi"
          color="inherit"
          underline="none"
          display="block"
        >
          Video Arşivi
        </Link>
        <Link
          href="https://search.trdizin.gov.tr/tr/proje/ara"
          color="inherit"
          underline="none"
          display="block"
        >
          Projeler Veritabanı
        </Link>
      </Box>
      <Box>
        <Typography variant="h6" component="div" gutterBottom>
          ÇAĞRI MERKEZİ
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <PhoneIcon />
          <Typography variant="h6" component="div" ml={1}>
            444 66 90
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" width="120px">
          <IconButton
            color="inherit"
            href="https://www.facebook.com/tubitak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://twitter.com/tubitak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://tr.linkedin.com/company/tubitak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.instagram.com/tubitak/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.youtube.com/user/tubitaktv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://tubitak.gov.tr/sites/default/files/content_files/iletisim/edergi/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
