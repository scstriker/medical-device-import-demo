export interface EvidenceCard {
  evidence_id: string;
  indicator_id: string;
  source_name: string;
  source_type: string;
  source_url: string;
  raw_file_path: string;
  snapshot_path: string;
  screenshot_path: string;
  raw_hash: string;
  fetch_time: string;
  parser_version: string;
  quality_status: string;
  confidence: number;
  authority_level: string;
  manual_review_record: string;
  conflict_status: string;
  related_evidence: string[];
}
