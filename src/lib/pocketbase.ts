import PocketBase from 'pocketbase';

// Configuration PocketBase avec variable d'environnement
const POCKETBASE_URL = import.meta.env.POCKETBASE_URL || import.meta.env.PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(POCKETBASE_URL);

// Export de l'URL pour utilisation dans d'autres composants
export { POCKETBASE_URL };

// Interface TypeScript pour les projets
export interface Project {
  id: string;
  titre: string;
  etude_annee: string; // "BUT MMI 1", "BUT MMI 2", etc.
  projet_annee: string; // Date du projet
  categories: string[]; // ["Design graphique", "Développement web", etc.]
  resume: string;
  description: string;
  outils: string[]; // ["Illustrator", "Figma", etc.]
  images: string[]; // URLs des images
  image_projet: string; // Image principale du projet
  created: string;
  updated: string;
}

// Interface pour les statistiques calculées
export interface ProjectStats {
  value: string;
  label: string;
}

// Fonction pour récupérer tous les projets
export async function getProjects(): Promise<Project[]> {
  try {
    const records = await pb.collection('projet').getFullList({
      sort: '-created',
    });
    return records as Project[];
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    return [];
  }
}

// Fonction pour récupérer un projet par ID
export async function getProject(id: string): Promise<Project | null> {
  try {
    const record = await pb.collection('projet').getOne(id);
    return record as Project;
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    return null;
  }
}

// Fonction pour calculer les statistiques d'un projet
export function calculateProjectStats(project: Project): ProjectStats[] {
  const stats: ProjectStats[] = [];
  
  // Stat 1: Complexité basée sur le nombre d'outils
  const toolsCount = project.outils.length;
  let complexityValue = '75%';
  if (toolsCount >= 5) complexityValue = '95%';
  else if (toolsCount >= 3) complexityValue = '85%';
  
  stats.push({
    value: complexityValue,
    label: 'Complexité'
  });
  
  // Stat 2: Note basée sur les catégories
  const categoriesCount = project.categories.length;
  let grade = 'B+';
  if (categoriesCount >= 3) grade = 'A+';
  else if (categoriesCount >= 2) grade = 'A';
  
  stats.push({
    value: grade,
    label: 'Grade'
  });
  
  // Stat 3: Version basée sur l'année d'études
  let version = '1.0';
  if (project.etude_annee.includes('BUT MMI 2')) version = '2.0';
  else if (project.etude_annee.includes('BUT MMI 3')) version = '3.0';
  
  stats.push({
    value: version,
    label: 'Version'
  });
  
  return stats;
}

// Fonction pour formater la date du projet
export function formatProjectDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    }).toUpperCase();
  } catch {
    return dateString.toUpperCase();
  }
}

// Fonction pour générer l'ID unique du projet
export function generateProjectId(project: Project): string {
  const initials = project.titre
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 3);
  
  const year = new Date().getFullYear();
  const index = project.id.substring(0, 2).toUpperCase();
  
  return `${initials}-${year}-${index}`;
}

// Fonction pour générer l'URL complète de l'image du projet
export function getProjectImageUrl(project: Project): string | null {
  if (!project.image_projet) return null;
  return `${POCKETBASE_URL}/api/files/projet/${project.id}/${project.image_projet}`;
}

// Interface TypeScript pour les contacts
export interface Contact {
  id: string;
  prenom: string;
  nom: string;
  mail: string;
  sujet: string;
  message: string;
  created: string;
  updated: string;
}

// Fonction pour créer un nouveau contact
export async function createContact(contactData: {
  prenom: string;
  nom: string;
  mail: string;
  sujet: string;
  message: string;
}): Promise<Contact | null> {
  try {
    console.log('Tentative de création du contact avec PocketBase...');
    console.log('URL PocketBase:', POCKETBASE_URL);
    console.log('Données à envoyer:', contactData);
    
    const record = await pb.collection('contact').create(contactData);
    console.log('Enregistrement créé avec succès:', record);
    return record as Contact;
  } catch (error: any) {
    console.error('Erreur complète:', error);
    console.error('Type d\'erreur:', typeof error);
    console.error('Status:', error.status);
    console.error('Response:', error.response);
    console.error('Data:', error.data);
    console.error('Message:', error.message);
    
    // Gestion d'erreurs plus détaillée
    if (error.status === 400) {
      console.error('Erreur 400 - Détails:', error.data);
      throw new Error(`Erreur de validation: ${JSON.stringify(error.data)}`);
    } else if (error.status === 403) {
      throw new Error('Accès refusé - Vérifiez les permissions de la collection contact');
    } else if (error.status === 404) {
      throw new Error('Collection "contact" introuvable');
    } else if (error.status === 500) {
      throw new Error('Erreur du serveur PocketBase');
    } else if (error.message && error.message.includes('fetch')) {
      throw new Error(`Impossible de se connecter à PocketBase sur ${POCKETBASE_URL}`);
    } else {
      // Afficher l'erreur complète pour debugging
      throw new Error(`Erreur PocketBase (${error.status || 'unknown'}): ${error.message || 'Something went wrong'} - Détails: ${JSON.stringify(error.data || {})}`);
    }
  }
}

export default pb;