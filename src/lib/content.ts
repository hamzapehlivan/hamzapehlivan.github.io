export type LinkItem = {
  label: string;
  href: string;
};

export type PairSide = { src: string; alt: string; label?: string };

export type ResultMedia =
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "video"; src: string; poster?: string; caption?: string }
  | { kind: "pair"; before: PairSide; after: PairSide; caption?: string };

export type ResultGallery = {
  title?: string;
  description?: string;
  layout?: "grid" | "stack";
  /** When set with layout: "grid", forces this exact number of columns at desktop widths. */
  columns?: number;
  items: ResultMedia[];
};

export type PublicationHighlight = {
  label: "Best Paper Candidate" | "Oral";
  icon: "trophy" | "spotlight";
};

export type Publication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  venueShort?: string;
  year: number;
  status?: "Under Review" | "Preprint" | "Published";
  image: string;
  imageAlt: string;
  links: LinkItem[];
  focus: string[];
  equalContribution?: boolean;
  highlights?: PublicationHighlight[];
  results?: ResultGallery[];
};

export type TimelineItem = {
  institution: string;
  role: string;
  location: string;
  period: string;
  details: string[];
  logo?: string;
  logoAlt?: string;
};

export const profile = {
  name: "Hamza Pehlivan",
  title: "Doctoral Researcher",
  affiliation:
    "Max Planck Institute for Informatics, Visual Computing and Artificial Intelligence",
  affiliationShort: "MPI Informatics — VCAI",
  location: "Saarbrücken, Germany",
  office: "Campus E1 4, Room 214",
  email: "hamzapehlivan.cs@gmail.com",
  github: "https://github.com/hamzapehlivan",
  linkedin: "https://www.linkedin.com/in/hamza-pehlivan",
  scholar: "https://scholar.google.com/citations?user=_uQyxOoAAAAJ",
  mpiPage: "https://people.mpi-inf.mpg.de/~hpehliva/",
  cv: "/hamza-pehlivan-cv.pdf",
  photo: "/hamza-pehlivan.jpg",
  links: {
    mpiDepartment:
      "https://www.mpi-inf.mpg.de/departments/visual-computing-and-artificial-intelligence",
    theobalt: "https://people.mpi-inf.mpg.de/~theobalt/",
    dundar: "https://www.cs.bilkent.edu.tr/~adundar/",
    dlrLab: "https://dlr.bilkent.edu.tr/",
  },
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Publications", href: "#publications" },
  { label: "Teaching", href: "#teaching" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// ---- StyleRes results helpers ----
const STYLERES_BASE =
  "https://www.cs.bilkent.edu.tr/~adundar/projects/StyleRes/static/edits";

type StyleResEdit = {
  title: string;
  folder: string;
  ids: (string | number)[];
};

const STYLERES_EDITS: StyleResEdit[] = [
  { title: "Bangs (+)", folder: "bangs", ids: [600, 1425, 1815] },
  { title: "Glasses (+)", folder: "glasses", ids: [303, 1012, 1267] },
  { title: "Bobcut (+)", folder: "bobcut", ids: [28029, 28474, 28640] },
  { title: "Close eyes", folder: "eye", ids: [0, 1, 1037] },
  { title: "Lipstick (+)", folder: "lipstick", ids: [106, 1011, 1027] },
  { title: "Beard (+)", folder: "beard", ids: [10229, 10791, 10365] },
  { title: "Smile (+)", folder: "smile_add", ids: [413, 613, 983] },
  { title: "Smile (−)", folder: "smile_rm", ids: [1030, 2667, 4108] },
  { title: "Age (+)", folder: "age_add", ids: [1038, 1281, 10342] },
  { title: "Age (−)", folder: "age_rm", ids: [116, 129, 1032] },
  { title: "Pose", folder: "pose", ids: [1161, 10397, 10884] },
];

function styleResGalleries(): ResultGallery[] {
  return STYLERES_EDITS.map((edit) => ({
    title: edit.title,
    layout: "grid",
    columns: 3,
    items: edit.ids.map((id): ResultMedia => ({
      kind: "pair",
      before: {
        src: `${STYLERES_BASE}/${edit.folder}/${id}.jpg`,
        alt: `Input image ${id}`,
        label: "Input",
      },
      after: {
        src: `${STYLERES_BASE}/${edit.folder}/${id}.gif`,
        alt: `${edit.title} result for image ${id}`,
        label: edit.title,
      },
    })),
  }));
}

// Add new papers to the top.
export const publications: Publication[] = [
  {
    slug: "lm-rs",
    title: "Matrix-free Second-order Optimization of Gaussian Splats with Residual Sampling",
    authors:
      "H. Pehlivan, A. B. Camiletto, L. G. Foo, M. Habermann, C. Theobalt",
    venue: "International Conference on 3D Vision",
    venueShort: "3DV",
    year: 2026,
    status: "Published",
    highlights: [
      { label: "Best Paper Candidate", icon: "trophy" },
      { label: "Oral", icon: "spotlight" },
    ],
    image: "/papers/lm-is.png",
    imageAlt: "Gaussian splatting optimization result comparison",
    links: [
      { label: "Project", href: "https://vcai.mpi-inf.mpg.de/projects/LM-RS/" },
      { label: "arXiv", href: "https://arxiv.org/abs/2504.12905" },
      { label: "Code", href: "https://github.com/hamzapehlivan/lm-rs" },
    ],
    focus: ["3D Gaussian Splatting", "Matrix-free Optimization", "Levenberg-Marquardt", "Forward Differentiation", "CUDA"],
    results: [
      {
        title: "Results",
        layout: "stack",
        items: [
          { kind: "video", src: "/papers/lm-rs/videos/chair.mp4", caption: "Chair" },
          { kind: "video", src: "/papers/lm-rs/videos/hotdog.mp4", caption: "Hotdog" },
          { kind: "video", src: "/papers/lm-rs/videos/lego.mp4", caption: "Lego" },
          { kind: "video", src: "/papers/lm-rs/videos/ship.mp4", caption: "Ship" },
          { kind: "video", src: "/papers/lm-rs/videos/materials.mp4", caption: "Materials" },
          { kind: "video", src: "/papers/lm-rs/videos/ficus.mp4", caption: "Ficus" },
        ],
      },
      {
        title: "360° Comparisons",
        description: "Both methods are trained for ~15 seconds.",
        layout: "grid",
        items: [
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_chair.mp4", caption: "Chair" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_drums.mp4", caption: "Drums" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_ficus.mp4", caption: "Ficus" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_hotdog.mp4", caption: "Hotdog" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_lego.mp4", caption: "Lego" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_materials.mp4", caption: "Materials" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_mic.mp4", caption: "Mic" },
          { kind: "video", src: "/papers/lm-rs/videos/360_comparison_ship.mp4", caption: "Ship" },
        ],
      },
    ],
  },
  {
    slug: "warpres",
    title: "Warping the Residuals for Image Editing with StyleGAN",
    authors: "A. Yildirim, H. Pehlivan, A. Dundar",
    venue: "International Journal of Computer Vision",
    venueShort: "IJCV",
    year: 2024,
    status: "Published",
    image: "/papers/warpres.svg",
    imageAlt: "WarpRes image editing examples",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2312.11422" }],
    focus: ["Real Image Editing", "StyleGAN", "GAN Inversion", "Optical Flow"],
  },
  {
    slug: "styleres",
    title: "StyleRes: Transforming the Residuals for Real Image Editing with StyleGAN",
    authors: "H. Pehlivan, Y. Dalva, A. Dundar",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    venueShort: "CVPR",
    year: 2023,
    status: "Published",
    image: "/papers/styleres.jpg",
    imageAlt: "StyleRes real image editing examples",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2212.14359" },
      { label: "Project", href: "https://www.cs.bilkent.edu.tr/~adundar/projects/StyleRes/" },
      { label: "Code", href: "https://github.com/hamzapehlivan/StyleRes" },
    ],
    focus: ["StyleGAN", "GAN Inversion", "Real Image Editing"],
    results: styleResGalleries(),
  },
  {
    slug: "diverse-inpainting",
    title: "Diverse Inpainting and Editing with GAN Inversion",
    authors: "A. Yildirim*, H. Pehlivan*, B. Bilecen, A. Dundar",
    venue: "International Conference on Computer Vision",
    venueShort: "ICCV",
    year: 2023,
    status: "Published",
    image: "/papers/gan-inversion-inpainting.svg",
    imageAlt: "Diverse inpainting and editing examples",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2307.15033" }],
    focus: ["Image Inpainting", "GAN Inversion", "Diverse Inpainting"],
    equalContribution: true,
  },
  {
    slug: "vecgan",
    title: "Face Attribute Editing with Disentangled Latent Vectors",
    authors: "Y. Dalva, H. Pehlivan, O. I. Hatipoglu, C. Moran, A. Dundar",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    venueShort: "TPAMI",
    year: 2023,
    status: "Published",
    image: "/papers/vecgan.jpg",
    imageAlt: "Face attribute editing examples",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2301.04628" },
      { label: "Project", href: "https://yusufdalva.github.io/vecgan/" },
      { label: "Code", href: "https://github.com/yusufdalva/VecGAN" },
    ],
    focus: ["Face Editing", "Latent Directions", "Disentanglement"],
  },
  {
    slug: "robustness-instance-segmentation",
    title: "Benchmarking the Robustness of Instance Segmentation Models",
    authors: "Y. Dalva, H. Pehlivan, S. F. Altindis, A. Dundar",
    venue: "IEEE Transactions on Neural Networks and Learning Systems",
    venueShort: "TNNLS",
    year: 2022,
    status: "Published",
    image: "/papers/robustness.png",
    imageAlt: "Robustness benchmark examples for instance segmentation",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2109.01123" }],
    focus: ["Instance Segmentation", "Robustness", "Benchmarking"],
  },
];

export const researchAreas = [
  "3D/4D Scene Representations",
  "Gaussian Splatting",
  "Optimization",
  "Generative Adversarial Networks",
  "GAN Inversion"
];

export const experience: TimelineItem[] = [
  {
    institution: "Bilkent Generative Deep Learning Research Lab",
    role: "Research Assistant",
    location: "Ankara, Turkey",
    period: "Sep 2021 – Jun 2023",
    details: [
      "Researched high-fidelity image reconstruction, image editing, and inpainting using StyleGAN; advised by Asst. Prof. Aysegül Dündar.",
      "Contributed to facial attribute editing methods compared against StyleGAN-based baselines.",
      "Analyzed robustness of instance segmentation models under lighting, weather, and noise perturbations.",
    ],
    logo: "/logos/bilkent.png",
    logoAlt: "Bilkent University emblem",
  },
  {
    institution: "Jotform",
    role: "Summer Intern",
    location: "Ankara, Turkey",
    period: "Jun 2021 – Jul 2021",
    details: [
      "Built a website-based recommendation system: crawled and clustered websites into topics with Python and scikit-learn.",
    ],
    logo: "/logos/jotform.svg",
    logoAlt: "Jotform logo",
  },
  {
    institution: "A2 Technology",
    role: "Summer Intern",
    location: "Ankara, Turkey",
    period: "Jun 2020 – Jul 2020",
    details: [
      "Worked on an under-vehicle inspection system combining classical vision and deep learning.",
      "Implemented image comparison with SIFT descriptors using OpenCV and C++.",
    ],
    logo: "/logos/a2.png",
    logoAlt: "a2 Technology logo",
  },
];

export const teaching: TimelineItem[] = [
  {
    institution: "Saarland University",
    role: "Seminar Supervisor",
    location: "Saarbrücken, Germany",
    period: "Apr 2024 – Jul 2024",
    details: [
      "Supervised the “Volume Rendering” topic in the seminar [Classical Concepts of Computer Vision and Computer Graphics in the Neural Age](https://vcai.mpi-inf.mpg.de/teaching/vcai_seminar_2024/topics.html).",
    ],
    logo: "/logos/saarland.png",
    logoAlt: "Saarland University emblem",
  },
  {
    institution: "Bilkent University",
    role: "Teaching Assistant",
    location: "Ankara, Turkey",
    period: "Sep 2021 – Jun 2023",
    details: [
      "Computer Networks (3 semesters): designed projects on TCP/UDP protocols.",
      "Introduction to Python (1 semester): led weekly labs and supported students in programming work.",
      "Mentored undergraduate research students at Bilkent Generative DLR Lab with [Docker and GPU-server tutorials](https://hamzapehlivan.wordpress.com/).",
    ],
    logo: "/logos/bilkent.png",
    logoAlt: "Bilkent University emblem",
  },
];

export const education: TimelineItem[] = [
  {
    institution: "Saarland University & MPI for Informatics",
    role: "Ph.D. in Computer Science",
    location: "Saarbrücken, Germany",
    period: "Nov 2023 – present",
    details: [
      "Doctoral researcher in the Visual Computing and Artificial Intelligence department.",
    ],
    logo: "/logos/mpg.svg",
    logoAlt: "Max-Planck-Gesellschaft Minerva mark",
  },
  {
    institution: "Bilkent University",
    role: "M.Sc. in Computer Science",
    location: "Ankara, Turkey",
    period: "Sep 2021 – Jun 2023",
    details: [
      "Full departmental scholarship for academic achievement during undergraduate studies.",
      "CGPA: 3.96 / 4.00.",
    ],
    logo: "/logos/bilkent.png",
    logoAlt: "Bilkent University emblem",
  },
  {
    institution: "Bilkent University",
    role: "B.Sc. in Computer Science",
    location: "Ankara, Turkey",
    period: "Sep 2016 – Jun 2021",
    details: [
      "Comprehensive scholarship awarded for high ranking (top ~0.07%) in the University Placement Exam.",
      "CGPA: 3.52 / 4.00.",
    ],
    logo: "/logos/bilkent.png",
    logoAlt: "Bilkent University emblem",
  },
];

export const skills = [
  { label: "Programming", values: ["Python", "C++", "CUDA"] },
  { label: "Frameworks & Tools", values: ["PyTorch", "Linux", "Docker", "Git"] },
  { label: "Languages", values: ["Turkish (native)", "English (professional)"] },
];
