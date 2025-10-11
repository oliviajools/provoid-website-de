import { Section } from "@/components/Section";

export const metadata = {
  title: "Über uns | PROVOID",
  description: "Unsere Idee, Vision, Geschichte und Team – ausführlich erklärt.",
};

export default function UeberUnsPage() {
  return (
    <div className="container px-4 md:px-6 lg:px-8 py-[38px] md:py-[58px]">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Page Title */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Über uns</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Wir machen neurowissenschaftliche Erkenntnisse verständlich und anwendbar – evidenzbasiert und wirkungsorientiert.
          </p>
        </section>

        <Section id="idee" title="Unsere Idee">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              PROVOID begann als „Jugend forscht“-Projekt zum Thema der Prokrastination. Der Name war schnell gefunden: PROVOID – kurz für Procrastination avoid.
            </p>
            <p>
              Im Verlauf der Arbeit wurde klar, wie stark neurowissenschaftliche Mechanismen Entscheidungen, Arbeitsverhalten und Kognition prägen. PROVOID wuchs – und mit uns die leitende Idee.
            </p>
            <p>
              Heute verfolgen wir einen breiteren Ansatz: Wir übersetzen aktuelle Forschung und betreiben eigene Studien in der angewandten Neurowissenschaft, um neuronale Fähigkeiten in allen leistungsbezogenen Bereichen zu optimieren – von Fokus und Lernen über Zusammenarbeit bis zu resilienten Strukturen in Organisationen.
            </p>
          </div>
        </Section>

        <Section id="vision" title="Unsere Vision">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Unsere Vision ist eine Gesellschaft, in der jede und jeder neurowissenschaftlichen Fortschritt nutzen kann. Wir machen Erkenntnisse aus der Forschung verständlich und zugänglich, damit Menschen ihre neuronalen Fähigkeiten entfalten und verantwortungsvoll einsetzen. So entstehen bessere Entscheidungen, mehr Fokus, nachhaltiges Lernen und gesunde Zusammenarbeit im Alltag und in Organisationen. Wir wollen wachsen, damit dieser Zugang breit verfügbar wird und die Wirkung für die Gesellschaft stetig zunimmt. Transparenz, Innovation und Qualität leiten unser Handeln. Wir streben danach, Standards zu setzen und innovative Lösungen zu entwickeln, die nachhaltig positive Veränderungen bewirken. So möchten wir der führende Partner für ganzheitliche Entwicklung und Optimierung werden.
            </p>
          </div>
        </Section>

        <Section id="geschichte" title="Unsere Geschichte">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Das Ursprungsprojekt von PROVOID entstand 2023 und nahm 2024 erstmals erfolgreich bei dem Wettbewerb „Jugend forscht” teil. Im Frühjahr entstand hieraus das Einzelunternehmen und StartUp PROVOID. 2025 war das Projekt Teil der JugendUnternimmt-Summerschool und belegte deutschlandweit den 2. Platz. Im Oktober 2025 wurde es nun für den Hamburger-Award „STARTERiN” 2025 nominiert.
            </p>
          </div>
        </Section>

        <Section id="wer-ist-provoid" title="Wer sind Wir?">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>PROVOID wurde im April 2025 von Olivia Bahr gegründet.</p>
            <p>Olivia Bahr hat 2025 ihr Abitur im naturwissenschaftlichen Profil abgeschlossen und bereits ein Juniorstudium im Fachbereich Physik (B.Sc.) an der Universität Hamburg absolviert.</p>
            <p>An ihrer Seite arbeitet seit Juli 2025 ein Programmierer und die Marketing-Abteilung wächst stetig.</p>
            <p>Wir stehen im engen Austausch mit Neurologen, Neurowissenschaftlern und PsychologInnen in Hamburg und Umgebung und können es kaum erwarten, weiter zu wachsen.</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
