"""Audit logging service"""

from typing import Any, Dict, Optional

from sqlalchemy.orm import Session

from app.models import AuditLog


class AuditService:
    """Service for logging system actions"""

    @staticmethod
    def log_action(
        db: Session,
        action: str,
        user_id: Optional[int] = None,
        entity_type: Optional[str] = None,
        entity_id: Optional[int] = None,
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
    ) -> AuditLog:
        """Log an action to the audit log"""
        log_entry = AuditLog(
            user_id=user_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details or {},
            ip_address=ip_address,
        )

        db.add(log_entry)
        db.commit()
        db.refresh(log_entry)

        return log_entry
