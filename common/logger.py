"""configuration for logging in the application."""

import logging
import sys
import os
import json


class JsonFormatter(logging.Formatter):
    """Formatter that emits structured JSON log records.

    Converts a LogRecord into a JSON string with timestamp, level, logger, message,
    and optional exception details, using datefmt for timestamp formatting.
    """
    def format(self, record):
        log_record = {
            "timestamp": self.formatTime(record, self.datefmt),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_record)


def setup_logger(name: str) -> logging.Logger:
    """Set up a logger with console output and configurable format."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if os.getenv("DEBUG", "false").lower() == "true" else logging.INFO)

    handler = logging.StreamHandler(sys.stdout)

    log_format = os.getenv("LOG_FORMAT", "plain").lower()

    if log_format == "json":
        formatter = JsonFormatter(datefmt="%Y-%m-%d %H:%M:%S")
    else:
        formatter = logging.Formatter(
            fmt="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )

    handler.setFormatter(formatter)

    if not logger.handlers:  # evitar duplicados en reload
        logger.addHandler(handler)

    return logger


# Logger global de la app
app_logger = setup_logger("geo-processor")
